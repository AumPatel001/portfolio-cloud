import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  pageVisits, type PageVisit, type InsertPageVisit,
  projectInquiries, type ProjectInquiry, type InsertProjectInquiry
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  markContactSubmissionAsResponded(id: number): Promise<ContactSubmission | undefined>;
  
  // Analytics methods
  recordPageVisit(visit: InsertPageVisit): Promise<PageVisit>;
  getPageVisits(): Promise<PageVisit[]>;
  
  // Project inquiry methods
  createProjectInquiry(inquiry: InsertProjectInquiry): Promise<ProjectInquiry>;
  getProjectInquiries(): Promise<ProjectInquiry[]>;
  updateProjectInquiryStatus(id: number, status: string): Promise<ProjectInquiry | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Contact form methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(submission).returning();
    return result;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }
  
  async markContactSubmissionAsResponded(id: number): Promise<ContactSubmission | undefined> {
    const [updated] = await db
      .update(contactSubmissions)
      .set({ responded: true })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  }
  
  // Analytics methods
  async recordPageVisit(visit: InsertPageVisit): Promise<PageVisit> {
    const [result] = await db.insert(pageVisits).values(visit).returning();
    return result;
  }
  
  async getPageVisits(): Promise<PageVisit[]> {
    return await db.select().from(pageVisits).orderBy(pageVisits.visitedAt);
  }
  
  // Project inquiry methods
  async createProjectInquiry(inquiry: InsertProjectInquiry): Promise<ProjectInquiry> {
    const [result] = await db.insert(projectInquiries).values(inquiry).returning();
    return result;
  }
  
  async getProjectInquiries(): Promise<ProjectInquiry[]> {
    return await db.select().from(projectInquiries).orderBy(projectInquiries.createdAt);
  }
  
  async updateProjectInquiryStatus(id: number, status: string): Promise<ProjectInquiry | undefined> {
    const [updated] = await db
      .update(projectInquiries)
      .set({ status })
      .where(eq(projectInquiries.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
