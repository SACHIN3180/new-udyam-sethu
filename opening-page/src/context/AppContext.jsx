import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialInstitutions,
  initialEmployers,
  initialStudents,
  initialJobs,
  initialCampusDrives,
  initialNotifications,
  initialAlumniNetwork,
  vernacularData
} from "../data/mockData";

const AppContext = createContext();

const STORAGE_KEYS = {
  INSTITUTIONS: "udyam_institutions",
  EMPLOYERS: "udyam_employers",
  STUDENTS: "udyam_students",
  JOBS: "udyam_jobs",
  DRIVES: "udyam_drives",
  NOTIFICATIONS: "udyam_notifications",
  USER: "udyam_current_user",
  ADMIN_PWD: "udyam_admin_password",
  LANG: "udyam_language",
  LOW_BW: "udyam_low_bandwidth"
};

export const AppProvider = ({ children }) => {
  // Persistent State helpers
  const loadStored = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [institutions, setInstitutions] = useState(() =>
    loadStored(STORAGE_KEYS.INSTITUTIONS, initialInstitutions)
  );
  const [employers, setEmployers] = useState(() =>
    loadStored(STORAGE_KEYS.EMPLOYERS, initialEmployers)
  );
  const [students, setStudents] = useState(() =>
    loadStored(STORAGE_KEYS.STUDENTS, initialStudents)
  );
  const [jobs, setJobs] = useState(() =>
    loadStored(STORAGE_KEYS.JOBS, initialJobs)
  );
  const [campusDrives, setCampusDrives] = useState(() =>
    loadStored(STORAGE_KEYS.DRIVES, initialCampusDrives)
  );
  const [notifications, setNotifications] = useState(() =>
    loadStored(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  );
  const [alumniNetwork] = useState(initialAlumniNetwork);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() =>
    loadStored(STORAGE_KEYS.USER, null)
  );

  const [adminPassword, setAdminPassword] = useState(() =>
    loadStored(STORAGE_KEYS.ADMIN_PWD, "admin123")
  );

  // Vernacular and Accessibility
  const [language, setLanguage] = useState(() =>
    loadStored(STORAGE_KEYS.LANG, "en")
  );
  const [lowBandwidth, setLowBandwidth] = useState(() =>
    loadStored(STORAGE_KEYS.LOW_BW, false)
  );

  // Simulated Email Inboxes for Demo verification
  const [simulatedEmails, setSimulatedEmails] = useState([]);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INSTITUTIONS, JSON.stringify(institutions));
  }, [institutions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EMPLOYERS, JSON.stringify(employers));
  }, [employers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(campusDrives));
  }, [campusDrives]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PWD, JSON.stringify(adminPassword));
  }, [adminPassword]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, JSON.stringify(language));
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOW_BW, JSON.stringify(lowBandwidth));
  }, [lowBandwidth]);

  // Auth Operations
  const logout = () => {
    setCurrentUser(null);
  };

  // Employer Registration
  const registerEmployer = (formData) => {
    const newEmployer = {
      id: `emp-${Date.now()}`,
      name: formData.name,
      industry: formData.industry || "Technology & Services",
      contactPerson: formData.contactPerson,
      email: formData.email.trim().toLowerCase(),
      password: formData.password || "employer123",
      phone: formData.phone,
      location: formData.location || "Karnataka, India",
      status: "pending", // Pending Admin Approval
      registeredAt: new Date().toISOString().split("T")[0],
      openPositions: 0,
      totalApplicants: 0,
      branding: {
        tagline: formData.tagline || "Innovating for tomorrow",
        logoColor: formData.logoColor || "#2563eb",
        website: formData.website || "https://example.com"
      }
    };

    setEmployers((prev) => [newEmployer, ...prev]);

    // Send Simulated Awaiting Approval Email
    const pendingEmail = {
      id: `mail-${Date.now()}`,
      to: newEmployer.email,
      recipientName: newEmployer.contactPerson,
      subject: "Awaiting Administrator Approval - Udyam Sethu Employer Portal",
      body: `Dear ${newEmployer.contactPerson},\n\nYour registration request for ${newEmployer.name} is currently pending administrator approval. You will be able to log in as soon as it is accepted.\n\n💡 Once the platform administrator accepts your registration in the Admin Portal, you can sign in directly with your registered email: ${newEmployer.email}.`,
      sentAt: new Date().toLocaleTimeString()
    };
    setSimulatedEmails((prev) => [pendingEmail, ...prev]);

    return {
      success: true,
      pendingApproval: true,
      employer: newEmployer,
      message: "Your registration request is currently pending administrator approval. You will be able to log in as soon as it is accepted."
    };
  };

  // Institution Registration
  const registerInstitution = (formData) => {
    const newInstitution = {
      id: `inst-${Date.now()}`,
      name: formData.name,
      code: formData.code || `INST-${Math.floor(1000 + Math.random() * 9000)}`,
      region: formData.region || "Kalyana Karnataka",
      email: formData.email.trim().toLowerCase(),
      password: formData.password || "institution123",
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      status: "pending", // Pending Admin Approval
      registeredAt: new Date().toISOString().split("T")[0],
      totalStudents: 0,
      activeStudents: 0,
      inactiveStudents: 0,
      avgAttendance: 0,
      avgScore: 0,
      assessmentsCompleted: 0,
      studentsAtRisk: 0,
      activityParticipation: "0%",
      placementCellHead: formData.placementCellHead || formData.contactPerson,
      accreditation: formData.accreditation || "NAAC Accredited"
    };

    setInstitutions((prev) => [newInstitution, ...prev]);

    // Send Simulated Awaiting Approval Email
    const pendingEmail = {
      id: `mail-${Date.now()}`,
      to: newInstitution.email,
      recipientName: newInstitution.contactPerson,
      subject: "Awaiting Administrator Approval - Udyam Sethu Institution Portal",
      body: `Dear ${newInstitution.contactPerson},\n\nYour registration request for ${newInstitution.name} is currently pending administrator approval. You will be able to log in as soon as it is accepted.\n\n💡 Once the platform administrator accepts your registration in the Admin Portal, you can sign in directly with your registered email: ${newInstitution.email}.`,
      sentAt: new Date().toLocaleTimeString()
    };
    setSimulatedEmails((prev) => [pendingEmail, ...prev]);

    return {
      success: true,
      pendingApproval: true,
      institution: newInstitution,
      message: "Your registration request is currently pending administrator approval. You will be able to log in as soon as it is accepted."
    };
  };

  // Employer Login
  const loginEmployer = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const emp = employers.find((e) => e.email.toLowerCase() === cleanEmail);

    if (!emp) {
      return { success: false, error: "No employer registered with this email address." };
    }

    if (emp.status === "pending") {
      return {
        success: false,
        pendingApproval: true,
        error: "Awaiting Administrator Approval\n\nYour registration request is currently pending administrator approval. You will be able to log in as soon as it is accepted.\n\n💡 Once the platform administrator accepts your registration in the Admin Portal, you can sign in directly."
      };
    }

    if (emp.status === "rejected") {
      return {
        success: false,
        error: "Your registration request was not approved by the platform administrator. Please contact support@udyamssethu.gov.in."
      };
    }

    const userObj = { role: "employer", data: emp };
    setCurrentUser(userObj);
    return { success: true, user: userObj };
  };

  // Institution Login
  const loginInstitution = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const inst = institutions.find((i) => i.email.toLowerCase() === cleanEmail);

    if (!inst) {
      return { success: false, error: "No academic institution registered with this email address." };
    }

    if (inst.status === "pending") {
      return {
        success: false,
        pendingApproval: true,
        error: "Awaiting Administrator Approval\n\nYour registration request is currently pending administrator approval. You will be able to log in as soon as it is accepted.\n\n💡 Once the platform administrator accepts your registration in the Admin Portal, you can sign in directly."
      };
    }

    if (inst.status === "rejected") {
      return {
        success: false,
        error: "Your registration request was not approved by the administrator. Please contact verification@udyamssethu.gov.in."
      };
    }

    const userObj = { role: "institution", data: inst };
    setCurrentUser(userObj);
    return { success: true, user: userObj };
  };

  // Student Login (Restricted STRICTLY to emails issued by the institution!)
  const loginStudent = (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const student = students.find((s) => s.email.toLowerCase() === cleanEmail);

    if (!student) {
      return {
        success: false,
        error: "This mail is not valid as a student given by the institution. Please use your official college email provided by your institution."
      };
    }

    const userObj = { role: "student", data: student };
    setCurrentUser(userObj);
    return { success: true, user: userObj };
  };

  // Developer / Admin Login
  const loginAdmin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === "admin@udyamssethu.gov.in" && password === adminPassword) {
      const userObj = {
        role: "admin",
        data: {
          name: "System Administrator",
          email: "admin@udyamssethu.gov.in",
          title: "Principal Secretary / Higher Education Department"
        }
      };
      setCurrentUser(userObj);
      return { success: true, user: userObj };
    }
    return { success: false, error: "Invalid Administrator email or password." };
  };

  // Admin Actions: Approve or Reject
  const approveRegistration = (type, id) => {
    let approvedItem = null;
    if (type === "employer") {
      setEmployers((prev) =>
        prev.map((emp) => {
          if (emp.id === id) {
            approvedItem = emp;
            return { ...emp, status: "approved" };
          }
          return emp;
        })
      );
    } else if (type === "institution") {
      setInstitutions((prev) =>
        prev.map((inst) => {
          if (inst.id === id) {
            approvedItem = inst;
            return { ...inst, status: "approved" };
          }
          return inst;
        })
      );
    }

    if (approvedItem) {
      const approvalEmail = {
        id: `mail-appr-${Date.now()}`,
        to: approvedItem.email,
        recipientName: approvedItem.contactPerson || approvedItem.name,
        subject: "Approved! Welcome to Udyam Sethu",
        body: `You have been Approved by the Admin so you can login using the credentials.\n\nPortal: ${type === "employer" ? "Employer Portal" : "Institution Portal"}\nEmail: ${approvedItem.email}\nStatus: Active / Verified`,
        sentAt: new Date().toLocaleTimeString()
      };
      setSimulatedEmails((prev) => [approvalEmail, ...prev]);
    }
  };

  const rejectRegistration = (type, id) => {
    if (type === "employer") {
      setEmployers((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, status: "rejected" } : emp))
      );
    } else if (type === "institution") {
      setInstitutions((prev) =>
        prev.map((inst) => (inst.id === id ? { ...inst, status: "rejected" } : inst))
      );
    }
  };

  // Institution Student Management: Add Student & Assign College Email
  const addStudentByInstitution = (institutionId, studentData) => {
    const institution = institutions.find((i) => i.id === institutionId);
    const newStudent = {
      id: `std-${Date.now()}`,
      institutionId,
      institutionName: institution ? institution.name : "Engineering College",
      name: studentData.name,
      email: studentData.email.trim().toLowerCase(), // College assigned email
      usn: studentData.usn.toUpperCase(),
      phone: studentData.phone || "+91 90000 00000",
      branch: studentData.branch || "Computer Science & Engineering",
      semester: Number(studentData.semester) || 1,
      hasWrittenExams: studentData.hasWrittenExams ?? (Number(studentData.semester) > 1),
      cgpa: Number(studentData.semester) === 1 && !studentData.hasWrittenExams ? null : Number(studentData.cgpa) || 7.5,
      attendance: Number(studentData.attendance) || 85.0,
      status: "Active",
      atRisk: Number(studentData.attendance) < 75,
      employabilityScore: 70,
      employabilityTrend: "Newly Enrolled",
      employabilityTrendDirection: "up",
      verifiedIdentity: {
        verifiedId: `UDS-KA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        qrToken: `VERIFIED-WORKFORCE-${studentData.usn.toUpperCase()}`,
        academicVerified: true,
        skillsVerified: false,
        internshipVerified: false,
        projectsVerified: false,
        issuedOn: new Date().toISOString().split("T")[0]
      },
      skills: [
        { name: "Programming Foundations", level: "Intermediate", score: 75, verified: true },
        { name: "Problem Solving", level: "Intermediate", score: 70, verified: false }
      ],
      skillGaps: ["Advanced Frameworks", "Cloud Deployments"],
      recommendedCourses: ["Foundations of Modern Engineering"],
      academicRecords: {
        semesters: [],
        upcomingIA: "IA 1 Internal Examination (Upcoming)",
        upcomingExams: "VTU Semester End Examinations"
      },
      assessments: [],
      certificates: [],
      resumeDetails: {
        bio: `${studentData.branch} undergraduate student at ${institution ? institution.name : "college"}.`,
        projects: []
      }
    };

    setStudents((prev) => [newStudent, ...prev]);

    // Update institution metrics
    setInstitutions((prev) =>
      prev.map((inst) => {
        if (inst.id === institutionId) {
          const tot = (inst.totalStudents || 0) + 1;
          const act = (inst.activeStudents || 0) + 1;
          return { ...inst, totalStudents: tot, activeStudents: act };
        }
        return inst;
      })
    );

    return newStudent;
  };

  // Edit / Update Student by Institution
  const updateStudentByInstitution = (studentId, updatedFields) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updated = { ...s, ...updatedFields };
          // If 1st sem with no exams, ensure CGPA remains null
          if (Number(updated.semester) === 1 && !updated.hasWrittenExams) {
            updated.cgpa = null;
          }
          if (updated.attendance < 75) {
            updated.atRisk = true;
            updated.status = "At Risk";
          } else {
            updated.atRisk = false;
            updated.status = "Active";
          }
          return updated;
        }
        return s;
      })
    );
  };

  // Institution Notification Broadcast with UNDO / REVERSE feature!
  const sendNotification = (institutionId, targetStudentId, title, message, category = "General") => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      institutionId,
      targetStudentId, // "all" or specific studentId
      title,
      message,
      category,
      sentAt: new Date().toISOString(),
      isReversed: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
    return newNotif;
  };

  // REVERSE / UNDO SENT NOTIFICATION
  const undoNotification = (notifId) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === notifId) {
          return { ...notif, isReversed: true, reversedAt: new Date().toISOString() };
        }
        return notif;
      })
    );
  };

  // Campus Drive Broadcast from Institution
  const broadcastCampusDrive = (institutionId, driveData) => {
    const newDrive = {
      id: `drive-${Date.now()}`,
      institutionId,
      companyName: driveData.companyName,
      packageInfo: driveData.packageInfo,
      driveDate: driveData.driveDate,
      venue: driveData.venue,
      eligibleBranches: driveData.eligibleBranches,
      minAttendance: Number(driveData.minAttendance) || 75,
      minCgpa: Number(driveData.minCgpa) || 7.0,
      status: "Upcoming",
      broadcastToStudents: true
    };
    setCampusDrives((prev) => [newDrive, ...prev]);
    return newDrive;
  };

  // Employer: Post Job or Internship
  const postJobByEmployer = (employerId, jobData) => {
    const emp = employers.find((e) => e.id === employerId);
    const newJob = {
      id: `job-${Date.now()}`,
      employerId,
      employerName: emp ? emp.name : "Enterprise Employer",
      title: jobData.title,
      type: jobData.type || "Full-Time",
      roleCategory: jobData.roleCategory || "Software & Technology",
      location: jobData.location || "Karnataka",
      stipendOrSalary: jobData.stipendOrSalary || "Competitive LPA",
      eligibility: jobData.eligibility || "B.E. / B.Tech Graduates",
      minCgpa: Number(jobData.minCgpa) || 6.5,
      requiredSkills: typeof jobData.requiredSkills === "string"
        ? jobData.requiredSkills.split(",").map((s) => s.trim())
        : jobData.requiredSkills || [],
      description: jobData.description,
      postedDate: new Date().toISOString().split("T")[0],
      deadline: jobData.deadline || "2026-12-31",
      applicants: []
    };

    setJobs((prev) => [newJob, ...prev]);
    setEmployers((prev) =>
      prev.map((e) => (e.id === employerId ? { ...e, openPositions: (e.openPositions || 0) + 1 } : e))
    );
    return newJob;
  };

  // Student: Apply to Job
  const applyToJob = (jobId, studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return { success: false, error: "Student not found" };

    // Calculate AI Fit Score based on skills match
    let matchScore = 75;
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      const studentSkillNames = student.skills.map((s) => s.name.toLowerCase());
      const matched = job.requiredSkills.filter((req) =>
        studentSkillNames.some((sk) => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk))
      );
      if (job.requiredSkills.length > 0) {
        matchScore = Math.min(98, Math.max(65, Math.round((matched.length / job.requiredSkills.length) * 100)));
      }
    }

    const applicationRecord = {
      studentId,
      studentName: student.name,
      studentEmail: student.email,
      studentUsn: student.usn,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied",
      fitScore: matchScore,
      fitReason: `Evaluated ${student.skills.length} verified competencies against requirement parameters.`
    };

    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const already = (j.applicants || []).find((a) => a.studentId === studentId);
          if (already) return j;
          return {
            ...j,
            applicants: [applicationRecord, ...(j.applicants || [])]
          };
        }
        return j;
      })
    );

    return { success: true, fitScore: matchScore };
  };

  // Employer: Update Application Status (Shortlist, Interview, Hire, Reject)
  const updateApplicationStatus = (jobId, studentId, newStatus) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const updatedApplicants = (j.applicants || []).map((app) =>
            app.studentId === studentId ? { ...app, status: newStatus } : app
          );
          return { ...j, applicants: updatedApplicants };
        }
        return j;
      })
    );
  };

  // Change Admin Password
  const updateAdminPassword = (newPassword) => {
    setAdminPassword(newPassword);
    return true;
  };

  // Translations helper
  const t = (key) => {
    const dict = vernacularData[language] || vernacularData.en;
    return dict[key] || vernacularData.en[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        institutions,
        employers,
        students,
        jobs,
        campusDrives,
        notifications,
        alumniNetwork,
        currentUser,
        setCurrentUser,
        logout,
        adminPassword,
        updateAdminPassword,
        language,
        setLanguage,
        t,
        lowBandwidth,
        setLowBandwidth,
        simulatedEmails,
        registerEmployer,
        registerInstitution,
        loginEmployer,
        loginInstitution,
        loginStudent,
        loginAdmin,
        approveRegistration,
        rejectRegistration,
        addStudentByInstitution,
        updateStudentByInstitution,
        sendNotification,
        undoNotification,
        broadcastCampusDrive,
        postJobByEmployer,
        applyToJob,
        updateApplicationStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
