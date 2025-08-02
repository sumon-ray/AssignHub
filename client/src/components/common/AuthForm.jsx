"use client";

import { useState } from "react";
import { USER_ROLES } from "../../lib/constants.js";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AuthForm({ type, onSubmit, errorMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(USER_ROLES.STUDENT); // Default role for registration
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await onSubmit(email, password, role);
    setLoading(false);
    if (!result.success) {
    }
  };

  const isRegister = type === "register";

  return (
    <Card className="w-full bg-slate-800 max-w-md mx-auto shadow-2xl border-purple-500 border-opacity-30">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-extrabold text-purple-600">
          {isRegister ? "Create Account" : "Welcome Back!"}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {isRegister
            ? "Join us to manage your assignments."
            : "Sign in to continue to your dashboard."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="text-lg font-semibold text-gray-300"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white"
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="text-lg font-semibold text-gray-300"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white"
            />
          </div>
          {isRegister && (
            <div>
              <Label
                htmlFor="role"
                className="text-lg font-semibold text-gray-300"
              >
                Role
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full mt-2 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-600">
                  <SelectItem value={USER_ROLES.STUDENT}>Student</SelectItem>
                  <SelectItem value={USER_ROLES.INSTRUCTOR}>
                    Instructor
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <Button
            type="submit"
            className=" mx-auto flex flex-col"
            disabled={loading}
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
