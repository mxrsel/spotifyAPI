import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getUserHistory} from "../../store/thunks/compositionHistoryThunk/compositionHistoryThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import HistoryItem from "./HistoryItem.tsx";

const History = () => {
    const dispatch = useAppDispatch();
    const composition = useAppSelector((state) => state.histories.compositionHistory);
    const loading = useAppSelector((state) => state.histories.isLoading);


    console.log(composition)

    useEffect(() => {
        dispatch(getUserHistory());
    }, [dispatch]);
    return (
        <>
            {loading ? <Spinner />
            :
            <>
                {composition.map((userHistory) => (
                    <HistoryItem key={userHistory._id} composition={userHistory} />
                ))}
            </>
            }
        </>
    );
};

export default History;