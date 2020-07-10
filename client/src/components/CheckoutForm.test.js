import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", async () => {
  render(<CheckoutForm />);
  const header = screen.getByText(/checkout form/i);
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />)

  const firstName = screen.getByLabelText(/first name/i)
  const lastName = screen.getByLabelText(/last name/i)
  const address = screen.getByLabelText(/address/i)
  const city = screen.getByLabelText(/city/i)
  const state = screen.getByLabelText(/state/i)
  const zip = screen.getByLabelText(/zip/i)

  fireEvent.change(firstName, { target: { value: 'Michael' }})
  fireEvent.change(lastName, { target: { value: 'Scott' }})
  fireEvent.change(address, { target: { value: '123 Home St' }})
  fireEvent.change(city, { target: { value: 'San Francisco' }})
  fireEvent.change(state, { target: { value: 'CA' }})
  fireEvent.change(zip, { target: { value: '12345' }})

  const checkout = screen.findByTestId(/checkout/i)
  const onSubmit = screen.getByTestId(/submit/i)
  fireEvent.submit(onSubmit)

  const submitMessage = screen.findByTestId(/successmessage/i)
  expect(firstName).toBeInTheDocument(/michael/i)
  expect(lastName).toBeInTheDocument(/scott/i)
  expect(address).toBeInTheDocument(/123 home st/i)
  expect(city).toBeInTheDocument(/san francisco/i)
  expect(state).toBeInTheDocument(/ca/i)
  expect(zip).toBeInTheDocument(/12345/i)
});