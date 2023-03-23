import { ContactElem } from 'components/ContactElem/ContactElem';
import { ListOfContacts } from './ContactsList.styled';
import { useSelector, useDispatch  } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from '../../redux/operations';
import { getContacts, getIsLoading, getError, getFilter } from '../../redux/selectors'


export function ContactsList() {
    const contacts = useSelector(getContacts);
    const isLoading = useSelector(getIsLoading);
    const error = useSelector(getError);
    const dispatch = useDispatch();

    const filterQuery = useSelector(getFilter);   
    const contactsToRender =  filterQuery.trim() 
        ? contacts.filter(({ name }) => name.toLowerCase().includes(filterQuery.toLowerCase())) 
        : contacts;

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <ListOfContacts>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}    
            {contactsToRender.map(({id, contact: {name, number}}) => {
                return (<ContactElem id={id} name={name} number={number}/>)
            })}
        </ListOfContacts>
    )
}
