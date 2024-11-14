import SearchBarItemForm from "./searchbaritemform";

export default function GuestForm() {
  return (
    <SearchBarItemForm title="Travelers" content={
        <form>
            Adults: <input type="number" min="1" max="99" className="w-9" defaultValue={1}></input>
            Children: <input type="number" min="0" max="99" className="w-10" defaultValue={0}></input>
        </form>
    }/>
  );
}