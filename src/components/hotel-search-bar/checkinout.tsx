import { DatePicker } from "./datepicker";
import SearchBarItemForm from "./searchbaritemform";

export default function CheckInAndOut() {
    return(
        <SearchBarItemForm title="Check In and Out Date" content={<DatePicker  className="border-0" />}/>
    );
}