import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";
import { Model } from "mongoose";

// This is a placeholder for your actual User model.
// You will need to define the full User schema and methods.
// The `comparePassword` method is assumed to exist on the User document.
interface IUser {
  id: string;
  email: string;
  comparePassword(password: string, callback: (err: any, isMatch: boolean) => void): void;
}

// Create a dummy User model to make the code runnable.
// In a real application, you would import your actual Mongoose User model.
const User: Model<IUser> = {
  // @ts-ignore
  findOne: async (query: any) => {
    // This is a dummy implementation. Replace with your actual database query.
    if (query.$or[0].email === "test@example.com") {
      return {
        id: "123",
        email: "test@example.com",
        comparePassword: (password: string, callback: (err: any, isMatch: boolean) => void) => {
          callback(null, password === "password123");
        }
      } as IUser;
    }
    return null;
  },
  // @ts-ignore
  findById: async (id: string) => {
    if (id === "123") {
      return {
        id: "123",
        email: "test@example.com",
        comparePassword: (password: string, callback: (err: any, isMatch: boolean) => void) => {
          callback(null, password === "password123");
        }
      } as IUser;
    }
    return null;
  }
} as Model<IUser>;

export default function (passport: PassportStatic) {
  // Define the local strategy for authentication.
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email: String, password: String, done) => {
      try {
        // Find the user by email in the database.
        const userExisting: IUser | null = await User.findOne({ $or: [{ email: email }] });

        // If the user doesn't exist, return an error message.
        if (!userExisting) {
          return done(null, false, { msg: `Email ${email} not found` });
        }
        
        // This check from the original code seems odd, as `passport` is the library itself.
        // It's likely a leftover from a different logic flow. I've kept it as-is for a direct conversion.
        if (!passport) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }

        // Compare the submitted password with the stored password.
        userExisting.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, userExisting);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      } catch (err) {
        console.error(err);
        return done(err);
      }
    })
  );

  // Serialize the user by storing their ID in the session.
  passport.serializeUser((user: any, done: (err: any, id: string) => void) => {
    done(null, user.id);
  });

  // Deserialize the user by finding the user document from the ID stored in the session.
  passport.deserializeUser(async (id: string, done: (err: any, user: IUser | null) => void) => {
    try {
      const user: IUser | null = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  });
}
