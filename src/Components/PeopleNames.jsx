import InputNames from "./InputNames";

export default function PeopleNames(props) {
  return (
    <>
      <div className="hidden">
        <div>
          {props.people.map((person) => (
            <p key={person.id}>{person.name}</p>
          ))}
          <InputNames cohort={props.cohort} />
        </div>
        <br />
      </div>
    </>
  );
}
