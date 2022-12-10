import { fetchIssuedInvoices } from "../../store/slices/currencyReducer";

export const SocketReducer = (socket, data, cb, dispatch) => {
    console.log(data.way);
    switch (data.way) {
        case 'CHECK_YOUR_ISSUES':
            CHECK_YOUR_ISSUES(dispatch, data)
            break;

        default:
            console.log('switch default');
            break;
    }
}

function CHECK_YOUR_ISSUES(dispatch, data) {
    console.log("CHECK_YOUR_ISSUES");
    console.log(data);
    dispatch(fetchIssuedInvoices(data.id))
}