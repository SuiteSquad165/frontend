import ReactStars from "react-stars";
import SearchBarItemForm from "../hotel-search-bar/searchbaritemform";

export default function StarFilter() {
    return(
        <SearchBarItemForm title="Select star ratings" content={
        <div className="flex-1 mt-3">
            <ReactStars/>
        </div>
        }/>
    );
}