import List "mo:core/List";
import Text "mo:core/Text";

module {
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

  type OldActor = {};
  type NewActor = {
    registrations : List.List<RegistrationForm>;
  };

  public func run(old : OldActor) : NewActor {
    { registrations = List.empty<RegistrationForm>() };
  };
};
