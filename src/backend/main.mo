import List "mo:core/List";
import Text "mo:core/Text";
import Migration "migration";

(with migration = Migration.run)
actor {
  type RegistrationForm = {
    name : Text;
    email : Text;
    phone : Text;
    university : Text;
    major : Text;
    year : Text;
    skillLevel : Text;
    interests : Text;
  };

  let registrations = List.empty<RegistrationForm>();

  public shared ({ caller }) func submitRegistration(form : RegistrationForm) : async () {
    registrations.add(form);
  };

  public query ({ caller }) func getAllRegistrations() : async [RegistrationForm] {
    registrations.toArray();
  };

  public query ({ caller }) func getAnalytics() : async {
    totalRegistrations : Nat;
  } {
    {
      totalRegistrations = registrations.size();
    };
  };
};
