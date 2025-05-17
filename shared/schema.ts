import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication (existing)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  responded: boolean("responded").default(false).notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  message: true,
});

// Page visits for analytics
export const pageVisits = pgTable("page_visits", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  visitorIp: text("visitor_ip"),
  userAgent: text("user_agent"),
  referer: text("referer"),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const insertPageVisitSchema = createInsertSchema(pageVisits).pick({
  page: true,
  visitorIp: true,
  userAgent: true,
  referer: true,
});

// Project inquiries
export const projectInquiries = pgTable("project_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  companyName: text("company_name"),
  projectType: text("project_type").notNull(),
  budget: text("budget"),
  details: text("details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("new").notNull(),
});

export const insertProjectInquirySchema = createInsertSchema(projectInquiries).pick({
  name: true,
  email: true,
  companyName: true,
  projectType: true,
  budget: true,
  details: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertPageVisit = z.infer<typeof insertPageVisitSchema>;
export type PageVisit = typeof pageVisits.$inferSelect;

export type InsertProjectInquiry = z.infer<typeof insertProjectInquirySchema>;
export type ProjectInquiry = typeof projectInquiries.$inferSelect;
