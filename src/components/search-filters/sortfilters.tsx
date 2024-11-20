import SearchBarItemForm from "../hotel-search-bar/searchbaritemform";

export default function SortFilterDropdown() {
    return (
        <div className="flex-1 mt-3">
            <SearchBarItemForm title="Sort by" content={
                <form className="w-1/4">
                    <select name="subject" id="subject">
                    <option value="">None</option>
                    <option value="">Cost: High to Low</option>
                    <option value="">Cost: Low to High </option>
                    <option value="">Stars: High to Low</option>
                    <option value="">Stars: Low to High</option>
                </select>
            </form>
            }/>
        </div>
    );
}