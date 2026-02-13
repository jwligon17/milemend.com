"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { milemendContent } from "@/content/milemend";

type FormState = {
  name: string;
  email: string;
  org: string;
  message: string;
};

type FormErrors = Partial<FormState>;

const initialState: FormState = {
  name: "",
  email: "",
  org: "",
  message: "",
};

export function ContactForm() {
  const { contactPage } = milemendContent;
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validateForm(values: FormState): FormErrors {
    const nextErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name.trim()) nextErrors.name = contactPage.form.errors.required;
    if (!values.email.trim()) {
      nextErrors.email = contactPage.form.errors.required;
    } else if (!emailRegex.test(values.email)) {
      nextErrors.email = contactPage.form.errors.emailInvalid;
    }
    if (!values.org.trim()) nextErrors.org = contactPage.form.errors.required;
    if (!values.message.trim()) nextErrors.message = contactPage.form.errors.required;

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(formState);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setFormState(initialState);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">{contactPage.form.successTitle}</h1>
        <p className="mx-auto mt-3 text-sm text-slate-600">{contactPage.form.successBody}</p>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-slate-800">
          {contactPage.form.fields.name}
        </label>
        <input
          id="name"
          type="text"
          value={formState.name}
          onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.name ? <p className="mt-1 text-xs text-rose-600">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-800">
          {contactPage.form.fields.email}
        </label>
        <input
          id="email"
          type="email"
          value={formState.email}
          onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="org" className="text-sm font-semibold text-slate-800">
          {contactPage.form.fields.org}
        </label>
        <input
          id="org"
          type="text"
          value={formState.org}
          onChange={(event) => setFormState((prev) => ({ ...prev, org: event.target.value }))}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.org ? <p className="mt-1 text-xs text-rose-600">{errors.org}</p> : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-slate-800">
          {contactPage.form.fields.message}
        </label>
        <textarea
          id="message"
          rows={5}
          value={formState.message}
          onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.message ? <p className="mt-1 text-xs text-rose-600">{errors.message}</p> : null}
      </div>

      <div>
        <Button type="submit">{contactPage.form.submitLabel}</Button>
      </div>
    </form>
  );
}

