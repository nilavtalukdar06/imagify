import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex justify-center items-center">
      <SignIn />
    </div>
  );
}
