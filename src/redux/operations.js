import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://641c5ae5b556e431a86c6c3d.mockapi.io/api/v1";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
    const response = await axios.get("/contacts");
    console.log('response', response.data);
    return response.data;
  });

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
      try {
        const response = await axios.post("/contacts", {contact});
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
      try {
        const response = await axios.delete(`/contacts/${contactId}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

export const searchContact = createAsyncThunk(
    "contacts/searchContact",
    async (query, thunkAPI) => {
      try {
        const response = await axios.get(`/contacts?search=${query}`);
        const filteredContacts = response.data.filter(contact => {
          return contact.contact.name.toLowerCase().includes(query.toLowerCase());
        });
        return filteredContacts;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );