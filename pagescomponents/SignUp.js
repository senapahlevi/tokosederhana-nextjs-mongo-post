import { Toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useCurrentUser } from "../lib/user";
//import styles from "../styles/Auth.module.css";
const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useCurrentUser();
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await fetcher("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success("Your account has been created");
        router.replace("/feed");
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, router]
  );
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small className="form-text text-muted">
            <h1> We ll never share your email with anyone else.</h1>
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="footer">
        <Link href="/login" passHref>
          already have account? sign in here
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
