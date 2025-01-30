import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {getAllCompositionsForAdmin} from "./compositionAdminThunk.ts";
import AdminCompositionItem from "./AdminCompositionItem.tsx";

const AdminCompositionList = () => {
    const dispatch = useAppDispatch();
    const compositions = useAppSelector((state) => state.compositions.compositions);
    const loading = useAppSelector((state) => state.artists.isLoading);

    useEffect(() => {
        dispatch(getAllCompositionsForAdmin());
    }, [dispatch]);

    return (
        <div>
            {loading && <Spinner/>}
            <ul>
                {compositions.map((composition) => (
                    <AdminCompositionItem
                        key={composition._id}
                        composition={composition}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AdminCompositionList;