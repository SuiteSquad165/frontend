import { Button } from "react-day-picker";

const ReservationForm = ({price} : {price:any}) => {
    return (
        <article className="flex items-center w-1/5">
            <p className="p-3">
                <strong>{price}</strong>/night
            </p>
            <button className="bg-blue-400 rounded-sm m-3 p-3 text-white hover:bg-blue-500">
                Reserve
            </button>
        </article>
    );
}

export default ReservationForm;