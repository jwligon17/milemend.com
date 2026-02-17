"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { milemendContent } from "@/content/milemend";

type FormState = {
  name: string;
  email: string;
  organization: string;
  message: string;
  companyWebsite: string;
};

type FormErrors = Partial<Pick<FormState, "name" | "email" | "organization" | "message">>;

const initialState: FormState = {
  name: "",
  email: "",
  organization: "",
  message: "",
  companyWebsite: "",
};

export function ContactForm() {
  const { contactPage } = milemendContent;
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  function validateForm(values: FormState): FormErrors {
    const nextErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name.trim()) nextErrors.name = contactPage.form.errors.required;
    if (!values.email.trim()) {
      nextErrors.email = contactPage.form.errors.required;
    } else if (!emailRegex.test(values.email)) {
      nextErrors.email = contactPage.form.errors.emailInvalid;
    }
    if (!values.organization.trim()) nextErrors.organization = contactPage.form.errors.required;
    if (!values.message.trim()) nextErrors.message = contactPage.form.errors.required;

    return nextErrors;
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormState((prev) => ({ ...prev, [key]: value }));
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setSubmitError("");

    const nextErrors = validateForm(formState);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          organization: formState.organization,
          message: formState.message,
          companyWebsite: formState.companyWebsite,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus("error");
        setSubmitError(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setErrors({});
      setFormState(initialState);
    } catch {
      setStatus("error");
      setSubmitError("Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative mt-6 w-full space-y-4 overflow-visible rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:space-y-5 sm:p-6 lg:p-8"
    >
      <div>
        <label htmlFor="contact-name" className="text-sm font-bold text-slate-800">
          {contactPage.form.fields.name}
        </label>
        <input
          id="contact-name"
          type="text"
          value={formState.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.name ? <p className="mt-1 text-xs text-rose-600">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-bold text-slate-800">
          {contactPage.form.fields.email}
        </label>
        <input
          id="contact-email"
          type="email"
          value={formState.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-org" className="text-sm font-bold text-slate-800">
          {contactPage.form.fields.org}
        </label>
        <input
          id="contact-org"
          type="text"
          value={formState.organization}
          onChange={(event) => updateField("organization", event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.organization ? <p className="mt-1 text-xs text-rose-600">{errors.organization}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-bold text-slate-800">
          {contactPage.form.fields.message}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.message ? <p className="mt-1 text-xs text-rose-600">{errors.message}</p> : null}
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company-website">Company Website</label>
        <input
          id="contact-company-website"
          tabIndex={-1}
          autoComplete="off"
          type="text"
          name="companyWebsite"
          value={formState.companyWebsite}
          onChange={(event) => updateField("companyWebsite", event.target.value)}
        />
      </div>

      {status === "success" ? (
        <p className="text-sm text-emerald-700">Thanks &mdash; we&apos;ll reach out soon.</p>
      ) : null}
      {status === "error" && submitError ? (
        <p className="text-sm text-rose-600">{submitError}</p>
      ) : null}

      <div className="relative z-10 flex justify-start pt-2">
        <Button
          type="submit"
          variant="ink"
          size="lg"
          className="w-full shadow-sm sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : contactPage.form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
