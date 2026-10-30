import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WaitlistForm } from "./waitlist-form";

describe("waitlist form", () => {
  it("shows the error under the field and marks it invalid", async () => {
    const user = userEvent.setup();
    render(<WaitlistForm idPrefix="hero" />);
    await user.click(screen.getByRole("button", { name: "Join early access" }));
    const email = screen.getByLabelText("Work email");
    expect(await screen.findByText("Enter your work email to join.")).toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveFocus();
  });

  it("says sign-ups are not open yet and sends nothing", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<WaitlistForm idPrefix="final" withTeamSize />);
    await user.type(screen.getByLabelText("Work email"), "budi@kantor.co.id");
    await user.selectOptions(screen.getByLabelText("Team size"), "2 to 5");
    await user.click(screen.getByRole("button", { name: "Join early access" }));
    expect(
      await screen.findByText(
        "Early access sign-ups are not open yet. Nothing was sent; please check back soon.",
      ),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
