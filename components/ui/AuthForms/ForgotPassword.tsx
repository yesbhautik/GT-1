/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { requestPasswordUpdate } from "@/utils/auth-helpers/server"
import { handleRequest } from "@/utils/auth-helpers/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Define prop type with allowEmail boolean
interface ForgotPasswordProps {
  allowEmail: boolean
  redirectMethod: string
  disableButton?: boolean
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton
}: ForgotPasswordProps) {
  const router = redirectMethod === "client" ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true) // Disable the button while the request is being handled
    await handleRequest(e, requestPasswordUpdate, router)
    setIsSubmitting(false)
  }

  return (
    <div className="my-8">
      <form noValidate={true} className="mb-4" onSubmit={e => handleSubmit(e)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full rounded-md bg-zinc-800 p-3"
            />
          </div>
          <Button
            variant="default"
            type="submit"
            className="mt-1"
            loading={isSubmitting}
            disabled={disableButton}
          >
            Send Email
          </Button>
        </div>
      </form>
      <p>
        <Link href="/signin/password_signin" className="text-sm font-light">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="text-sm font-light">
            Sign in via magic link
          </Link>
        </p>
      )}
      <p>
        <Link href="/signin/signup" className="text-sm font-light">
          Don't have an account? Sign up
        </Link>
      </p>
    </div>
  )
}