import moment from 'moment'


export const dateFormat = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}

const totalExpense = ({allTransaction}) => { allTransaction.filter(
        (transaction) => transaction.type === "income"
    );
};

export default totalExpense;