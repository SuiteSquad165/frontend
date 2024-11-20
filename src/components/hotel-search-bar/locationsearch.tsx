import SearchBarItemForm from "./searchbaritemform";

export default function LocationForm() {
    return (
      <SearchBarItemForm title="Where to Go?" content={
        <input className="focus:outline-none" placeholder="Enter location..."></input>
      }/>
    );
}

