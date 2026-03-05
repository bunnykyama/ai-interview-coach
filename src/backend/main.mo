import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserProfile = {
    displayName : Text;
    email : Text;
  };

  type InterviewSession = {
    jobRole : Text;
    timestamp : Time.Time;
    overallScore : Nat;
    confidenceScore : Nat;
    communicationScore : Nat;
    technicalScore : Nat;
    feedback : Text;
  };

  type DashboardStats = {
    totalInterviews : Nat;
    averageScore : Nat;
    averageConfidence : Nat;
    improvementRate : Int;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let interviewSessions = Map.empty<Principal, List.List<InterviewSession>>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createInterviewSession(session : InterviewSession) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create interview sessions");
    };

    let existingSessions = switch (interviewSessions.get(caller)) {
      case (null) { List.empty<InterviewSession>() };
      case (?sessions) { sessions };
    };
    existingSessions.add(session);
    interviewSessions.add(caller, existingSessions);
  };

  public query ({ caller }) func getInterviewSessions() : async [InterviewSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view interview sessions");
    };

    switch (interviewSessions.get(caller)) {
      case (null) { [] };
      case (?sessions) { sessions.toArray() };
    };
  };

  public query ({ caller }) func getDashboardStats() : async DashboardStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view dashboard stats");
    };

    let sessions = switch (interviewSessions.get(caller)) {
      case (null) { [] };
      case (?sessions) { sessions.toArray() };
    };

    let totalInterviews = sessions.size();

    if (totalInterviews == 0) {
      return {
        totalInterviews = 0;
        averageScore = 0;
        averageConfidence = 0;
        improvementRate = 0;
      };
    };

    var totalScore : Nat = 0;
    var totalConfidence : Nat = 0;

    for (session in sessions.vals()) {
      totalScore += session.overallScore;
      totalConfidence += session.confidenceScore;
    };

    let averageScore = totalScore / totalInterviews;
    let averageConfidence = totalConfidence / totalInterviews;

    // Calculate improvement rate from score trend
    let improvementRate = if (totalInterviews >= 2) {
      let firstScore = sessions[0].overallScore;
      let lastScore = sessions[totalInterviews - 1].overallScore;
      Int.fromNat(lastScore) - Int.fromNat(firstScore);
    } else {
      0;
    };

    {
      totalInterviews = totalInterviews;
      averageScore = averageScore;
      averageConfidence = averageConfidence;
      improvementRate = improvementRate;
    };
  };

  public shared ({ caller }) func seedInterviewSessions() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can seed interview sessions");
    };

    if (interviewSessions.containsKey(caller)) {
      Runtime.trap("User already has interview sessions");
    };

    let session1 : InterviewSession = {
      jobRole = "Software Engineer";
      timestamp = Time.now() - 1_000_000_000;
      overallScore = 75;
      confidenceScore = 70;
      communicationScore = 80;
      technicalScore = 78;
      feedback = "Good technical knowledge, needs more confidence";
    };

    let session2 : InterviewSession = {
      jobRole = "Software Engineer";
      timestamp = Time.now();
      overallScore = 85;
      confidenceScore = 82;
      communicationScore = 88;
      technicalScore = 87;
      feedback = "Great improvement, keep practicing";
    };

    let sessions = List.fromArray<InterviewSession>([session1, session2]);
    interviewSessions.add(caller, sessions);
  };
};
