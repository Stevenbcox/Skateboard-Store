import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/pages/Login";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

describe("Login Component", () => {
  it("renders the login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("logs in successfully with valid credentials", async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: "exampleToken" },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(await screen.findByText("Login successful!")).toBeInTheDocument();
  });

  it("shows an error message with invalid credentials", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "WrongPassword" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });
});