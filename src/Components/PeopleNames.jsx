import InputNames from "./InputNames";

export default function PeopleNames(props) {
  console.log(props);
  const handleDelete = (person) => {
    props.cohort.removePersonFromCohort(person);
  };
  return (
    <>
      <div className="hidden">
        <div>
          {props.cohort.people.map((person) => (
            <p key={person.id}>
              {person.name}{" "}
              <button
                onClick={() => {
                  handleDelete(person);
                }}
              >
                Delete
              </button>
            </p>
          ))}
          <InputNames cohort={props.cohort} />
        </div>
        <br />
      </div>
    </>
  );
}
