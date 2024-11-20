import SortFilterDropdown from "./sortfilters";
import PriceSlider from "./priceslider";
import StarFilter from "./starfilter";
import SearchBarItemForm from "../hotel-search-bar/searchbaritemform";

const SearchFilter = () => {
    return(
        <>
            <SearchBarItemForm title="Select Price Range" content={<PriceSlider/>}/>
            <StarFilter/>
            <SortFilterDropdown/>
        </>
    );
}

export default SearchFilter;