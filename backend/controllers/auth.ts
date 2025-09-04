import { Request, Response, NextFunction } from "express";
import passport from "passport";
import validator from "validator";
import User, { IUser } from "../models/User.ts";

// Express
 import 'express'; // Important to import express to augment its types
import { Session } from 'express-session'; // Import the Session type from express-session



export const getLogin = (req: Request, res: Response): void => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login.ejs", {
    title: "Login",
  });
};

export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validationErrors: { msg: string }[] = [];
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }
  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: "Password cannot be blank." });
  }

  if (validationErrors.length) {

    return res.redirect("/login");
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err: Error, user: IUser, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response): void => {
  req.logout((err) => {
    if (err) {
      console.log('Error logging out:', err);
    }
    console.log("User has logged out.");
  });

  req.session.destroy((err) => {
    if (err) {
      console.log("Error : Failed to destroy the session during logout.", err);
    }
    req.user = undefined;
    res.redirect("/");
  });
};

export const getSignup = (req: Request, res: Response): void => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.body);
  const validationErrors: { msg: string }[] = [];
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  }
  if (validationErrors.length) {
    return res.redirect("/signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const userExisting = await User.findOne({ email: req.body.email });

    if (userExisting) {
      return res.redirect("/signup");
    }

    await user.save();

    req.logIn(user, (err) => {
      if (err) {
        console.log("Error logging in user after signup", err);
        return next(err);
      }
      res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error has occurred!" });
  }
};
