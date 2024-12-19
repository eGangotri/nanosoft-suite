--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: nanosoft-suite_owner
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "nanosoft-suite_owner";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: nanosoft-suite_owner
--

COMMENT ON SCHEMA public IS '';


--
-- Name: UserRoleType; Type: TYPE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TYPE public."UserRoleType" AS ENUM (
    'EMPLOYEE',
    'MANAGER',
    'SUPERVISOR',
    'ADMIN',
    'SUPERADMIN'
);


ALTER TYPE public."UserRoleType" OWNER TO "nanosoft-suite_owner";

--
-- Name: random_hex_color(); Type: FUNCTION; Schema: public; Owner: nanosoft-suite_owner
--

CREATE FUNCTION public.random_hex_color() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    hex_chars text[] := array['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    color text := '#';
BEGIN
    FOR i IN 1..6 LOOP
        color := color || hex_chars[ceil(random() * array_length(hex_chars, 1))];
    END LOOP;
    RETURN color;
END;
$$;


ALTER FUNCTION public.random_hex_color() OWNER TO "nanosoft-suite_owner";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO "nanosoft-suite_owner";

--
-- Name: Client; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."Client" (
    id integer NOT NULL,
    "companyName" character varying(100) NOT NULL,
    industry character varying(50),
    "primaryContact" character varying(100),
    "contactEmail" character varying(100),
    "contactPhone" character varying(20),
    "currentOpenings" integer DEFAULT 0,
    "lastContactDate" date,
    "nextFollowUp" date,
    status character varying(20),
    notes text
);


ALTER TABLE public."Client" OWNER TO "nanosoft-suite_owner";

--
-- Name: Employee; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."Employee" (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    designation text NOT NULL,
    "dateOfBirth" date NOT NULL,
    nationality text NOT NULL,
    email text NOT NULL,
    mobile text NOT NULL,
    "citizenshipStatus" text NOT NULL,
    "nricOrFinNo" text NOT NULL,
    "expiryDate" date,
    "maritalStatus" text NOT NULL,
    "foreignAddressLine1" text,
    "foreignAddressLine2" text,
    "foreignAddressCity" text,
    "foreignAddressCountry" text,
    "foreignAddressPostalCode" text,
    active boolean DEFAULT true NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    "middleName" text,
    gender text,
    race text,
    photo character varying(255),
    "localAddressLine1" text,
    "localAddressLine2" text,
    "localPostalCode" character varying(6) NOT NULL,
    "foreignAddressState" text,
    "localAddressLine3" text,
    "levelOrUnitNo" text,
    CONSTRAINT employee_citizenship_status_check CHECK (("citizenshipStatus" = ANY (ARRAY['Citizen'::text, 'PR'::text, 'Foreigner'::text]))),
    CONSTRAINT employee_gender_check CHECK ((gender = ANY (ARRAY['Male'::text, 'Female'::text]))),
    CONSTRAINT employee_race_check CHECK ((race = ANY (ARRAY['Chinese'::text, 'Malay'::text, 'Indian'::text, 'Other'::text])))
);


ALTER TABLE public."Employee" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeBankDetails; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."EmployeeBankDetails" (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    "bankName" character varying(255) NOT NULL,
    "employeeBankingName" character varying(255) NOT NULL,
    "accountNumber" character varying(50) NOT NULL,
    "accountType" character varying(10) NOT NULL,
    CONSTRAINT employee_bank_details_account_type_check CHECK ((("accountType")::text = ANY ((ARRAY['Current'::character varying, 'Savings'::character varying])::text[])))
);


ALTER TABLE public."EmployeeBankDetails" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeEmergencyContact; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."EmployeeEmergencyContact" (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    "personName" character varying(255) NOT NULL,
    relationship character varying(10) NOT NULL,
    mobile character varying(15) NOT NULL,
    address text NOT NULL,
    CONSTRAINT employee_emergency_contact_mobile_check CHECK (((mobile)::text ~* '^\+?[1-9]\d{1,14}$'::text)),
    CONSTRAINT employee_emergency_contact_relationship_check CHECK (((relationship)::text = ANY (ARRAY[('Spouse'::character varying)::text, ('Friend'::character varying)::text, ('Parent'::character varying)::text, ('Sibling'::character varying)::text, ('Landlord'::character varying)::text, ('Other'::character varying)::text])))
);


ALTER TABLE public."EmployeeEmergencyContact" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeHrDetails; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."EmployeeHrDetails" (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    "dateOfJoining" date NOT NULL,
    bonus numeric(10,2) NOT NULL,
    "passportNumber" character varying(20) NOT NULL,
    "passportIssueDate" date NOT NULL,
    "passportExpiryDate" date NOT NULL,
    "passType" character varying(5),
    "passExpiryDate" date,
    "renewalApplyDate" date,
    "newApplyDate" date,
    "passCancelledDate" date,
    remarks text,
    salary numeric(10,2) DEFAULT 0 NOT NULL,
    "workpermitNumber" character varying(10),
    "malaysiaIC" character varying(12),
    CONSTRAINT employee_hr_details_bonus_check CHECK ((bonus >= (0)::numeric)),
    CONSTRAINT employee_hr_details_pass_type_check CHECK (((("passType")::text = ANY ((ARRAY['EP'::character varying, 'PEP'::character varying, 'WP'::character varying, 'SPass'::character varying, ''::character varying])::text[])) OR ("passType" IS NULL)))
);


ALTER TABLE public."EmployeeHrDetails" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeHrDetailsClients; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."EmployeeHrDetailsClients" (
    id integer NOT NULL,
    "employeeHrId" integer NOT NULL,
    "clientId" integer NOT NULL,
    "assignedDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_assigned_date_not_future CHECK (("assignedDate" <= CURRENT_TIMESTAMP))
);


ALTER TABLE public."EmployeeHrDetailsClients" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeHrDetailsClients_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public."EmployeeHrDetailsClients_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EmployeeHrDetailsClients_id_seq" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeHrDetailsClients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public."EmployeeHrDetailsClients_id_seq" OWNED BY public."EmployeeHrDetailsClients".id;


--
-- Name: EmployeeLeaveBalance; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."EmployeeLeaveBalance" (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    "leaveTypeId" integer NOT NULL,
    "totalEntitlement" integer NOT NULL,
    "usedDays" integer DEFAULT 0,
    "remainingDays" integer GENERATED ALWAYS AS (("totalEntitlement" - "usedDays")) STORED
);


ALTER TABLE public."EmployeeLeaveBalance" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeLeaveBalance_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public."EmployeeLeaveBalance_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EmployeeLeaveBalance_id_seq" OWNER TO "nanosoft-suite_owner";

--
-- Name: EmployeeLeaveBalance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public."EmployeeLeaveBalance_id_seq" OWNED BY public."EmployeeLeaveBalance".id;


--
-- Name: EmployeeWorkHistory; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."EmployeeWorkHistory" (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    "jobTitle" character varying(255) NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date,
    department character varying(255),
    responsibilities text,
    "technologiesUsed" text
);


ALTER TABLE public."EmployeeWorkHistory" OWNER TO "nanosoft-suite_owner";

--
-- Name: Leave; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."Leave" (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL,
    "leaveTypeId" integer NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Leave" OWNER TO "nanosoft-suite_owner";

--
-- Name: LeaveType; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."LeaveType" (
    id integer NOT NULL,
    name text NOT NULL,
    color text,
    "defaultDays" integer NOT NULL,
    "leaveCode" character varying(5),
    CONSTRAINT description_min_length CHECK ((length(color) >= 2)),
    CONSTRAINT name_min_length CHECK ((length(name) >= 2))
);


ALTER TABLE public."LeaveType" OWNER TO "nanosoft-suite_owner";

--
-- Name: Leave_Type_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public."Leave_Type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Leave_Type_id_seq" OWNER TO "nanosoft-suite_owner";

--
-- Name: Leave_Type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public."Leave_Type_id_seq" OWNED BY public."LeaveType".id;


--
-- Name: Leave_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public."Leave_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Leave_id_seq" OWNER TO "nanosoft-suite_owner";

--
-- Name: Leave_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public."Leave_id_seq" OWNED BY public."Leave".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL,
    level integer NOT NULL
);


ALTER TABLE public."Role" OWNER TO "nanosoft-suite_owner";

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO "nanosoft-suite_owner";

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO "nanosoft-suite_owner";

--
-- Name: User; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    password text,
    "resetToken" text,
    "resetTokenExpiry" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO "nanosoft-suite_owner";

--
-- Name: UserEmployee; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."UserEmployee" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "employeeId" integer NOT NULL
);


ALTER TABLE public."UserEmployee" OWNER TO "nanosoft-suite_owner";

--
-- Name: UserEmployee_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public."UserEmployee_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserEmployee_id_seq" OWNER TO "nanosoft-suite_owner";

--
-- Name: UserEmployee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public."UserEmployee_id_seq" OWNED BY public."UserEmployee".id;


--
-- Name: UserRole; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."UserRole" (
    user_id text NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public."UserRole" OWNER TO "nanosoft-suite_owner";

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO "nanosoft-suite_owner";

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "nanosoft-suite_owner";

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_id_seq OWNER TO "nanosoft-suite_owner";

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public.client_id_seq OWNED BY public."Client".id;


--
-- Name: employee_bank_details_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public.employee_bank_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_bank_details_id_seq OWNER TO "nanosoft-suite_owner";

--
-- Name: employee_bank_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public.employee_bank_details_id_seq OWNED BY public."EmployeeBankDetails".id;


--
-- Name: employee_emergency_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public.employee_emergency_contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_emergency_contact_id_seq OWNER TO "nanosoft-suite_owner";

--
-- Name: employee_emergency_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public.employee_emergency_contact_id_seq OWNED BY public."EmployeeEmergencyContact".id;


--
-- Name: employee_hr_details_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public.employee_hr_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_hr_details_id_seq OWNER TO "nanosoft-suite_owner";

--
-- Name: employee_hr_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public.employee_hr_details_id_seq OWNED BY public."EmployeeHrDetails".id;


--
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_id_seq OWNER TO "nanosoft-suite_owner";

--
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public."Employee".id;


--
-- Name: employee_work_history_id_seq; Type: SEQUENCE; Schema: public; Owner: nanosoft-suite_owner
--

CREATE SEQUENCE public.employee_work_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_work_history_id_seq OWNER TO "nanosoft-suite_owner";

--
-- Name: employee_work_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nanosoft-suite_owner
--

ALTER SEQUENCE public.employee_work_history_id_seq OWNED BY public."EmployeeWorkHistory".id;


--
-- Name: Client id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Client" ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Name: Employee id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Employee" ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- Name: EmployeeBankDetails id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeBankDetails" ALTER COLUMN id SET DEFAULT nextval('public.employee_bank_details_id_seq'::regclass);


--
-- Name: EmployeeEmergencyContact id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeEmergencyContact" ALTER COLUMN id SET DEFAULT nextval('public.employee_emergency_contact_id_seq'::regclass);


--
-- Name: EmployeeHrDetails id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetails" ALTER COLUMN id SET DEFAULT nextval('public.employee_hr_details_id_seq'::regclass);


--
-- Name: EmployeeHrDetailsClients id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetailsClients" ALTER COLUMN id SET DEFAULT nextval('public."EmployeeHrDetailsClients_id_seq"'::regclass);


--
-- Name: EmployeeLeaveBalance id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeLeaveBalance" ALTER COLUMN id SET DEFAULT nextval('public."EmployeeLeaveBalance_id_seq"'::regclass);


--
-- Name: EmployeeWorkHistory id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeWorkHistory" ALTER COLUMN id SET DEFAULT nextval('public.employee_work_history_id_seq'::regclass);


--
-- Name: Leave id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Leave" ALTER COLUMN id SET DEFAULT nextval('public."Leave_id_seq"'::regclass);


--
-- Name: LeaveType id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."LeaveType" ALTER COLUMN id SET DEFAULT nextval('public."Leave_Type_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: UserEmployee id; Type: DEFAULT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserEmployee" ALTER COLUMN id SET DEFAULT nextval('public."UserEmployee_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- Data for Name: Client; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."Client" (id, "companyName", industry, "primaryContact", "contactEmail", "contactPhone", "currentOpenings", "lastContactDate", "nextFollowUp", status, notes) FROM stdin;
1	Microsoft	Technology	Satya Nadella	satya.nadella@microsoft.com	1234567890	5	2024-11-01	2024-12-01	Active	Top client with regular projects.
2	Google	Technology	Sundar Pichai	sundar.pichai@google.com	0987654321	3	2024-10-15	2024-11-30	Active	Looking for new partnership opportunities.
3	Tesla	Automotive	Elon Musk	elon.musk@tesla.com	1122334455	2	2024-09-20	2024-12-15	Pending	Potential partnership in renewable energy.
4	Facebook	Social Media	Mark Zuckerberg	mark.zuckerberg@facebook.com	5566778899	4	2024-11-10	2024-12-05	Active	Exploring opportunities in AI integration.
5	Netflix	Entertainment	Reed Hastings	reed.hastings@netflix.com	6677889900	1	2024-11-20	2024-12-10	Active	Collaboration on digital content delivery.
6	Amazon	E-Commerce	Andy Jassy	andy.jassy@amazon.com	3344556677	6	2024-11-18	2024-12-20	Active	Key partner for cloud services.
\.


--
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."Employee" (id, "firstName", "lastName", designation, "dateOfBirth", nationality, email, mobile, "citizenshipStatus", "nricOrFinNo", "expiryDate", "maritalStatus", "foreignAddressLine1", "foreignAddressLine2", "foreignAddressCity", "foreignAddressCountry", "foreignAddressPostalCode", active, deleted, "middleName", gender, race, photo, "localAddressLine1", "localAddressLine2", "localPostalCode", "foreignAddressState", "localAddressLine3", "levelOrUnitNo") FROM stdin;
6	Kodak	Jp	Tech	2016-11-12	Singapore	kodak@kodak.com	23234233	Citizen	S1234367A	2024-11-22	Single	125 Lavender St,	Singapore	JP	Singapore	338734	t	f	Camera	\N	\N	\N			000000	\N	\N	\N
8	Rajagopal	Moorthy	Manager	1980-10-04	Singapore	rajagopal@nanosoftbs.com	94665247	Citizen	G3265138R	2024-12-30	Married	Ubi Avenue 1	\N	Singapore	Singapore	400320	t	f		\N	\N	\N			000000	\N	\N	\N
2	Abc	Def	CEP	2017-11-01	Singapore	anoop@email.com	6565656523	Foreigner	G5880904R	2016-11-07	Single	Dream Lodge	Reception	SG	Singapore	208934	t	f	C	\N	\N	\N			000000	\N	\N	\N
3	Ram	Jethmalani	Lawyer	2024-11-12	India	six@seven.com	121212312	PR	G2324423R	2025-04-17	Single	werwer	fwersf	sfsdf	sfsf	222323	f	f	Krishna	\N	\N	\N			000000	\N	\N	\N
5	qwerty	zxcvb	qwwsazx	2024-11-12	India	qwerty@asfsdfsdf.com	324234234	PR	S1234567K	2024-11-06	Single	125 Lavender St,	Singapore	QA	Singapore	338734	f	f	asdf	\N	\N	\N			000000	\N	\N	\N
7	Malaysian	Foreigner	Canon	2024-10-31	Malaysia	canon@nokon.com	87898989	Foreigner	S1233467A	2024-11-13	Single	C153B	Sector 20	Noida	India	201301	f	f	DSLR	Male	Malay	\N			000000	\N	\N	\N
9	sfsdf	ssdsdfsdf	dsdfsfd	2024-12-04	Malaysia	data@sri.werr.org	7889999999	Foreigner	S1234567G	2024-12-06	Married	22222	22222	22222	2222	weewwewe	t	f	sdsdfs	\N	\N	\N	fdsf	sdfsdf	11111	\N	\N	\N
12	WWWWW	XXXX	sdsf	2024-12-03	Malaysia	ebooks@sri.rrr.org	23232323	Foreigner	S1234697G	2024-12-12	Defacto	werwer	efef	werwer	China	333333	f	f	AAA	Male	Indian	\N	sdf7	sdfsdf	222222	\N	\N	\N
13	Govinda	Ahuja	Actor	2005-12-05	Malaysia	ebooks@sri.rrreee.org	23232323	Foreigner	S1294567G	2024-12-12	Defacto	22222	22222	22222	Malaysia	201301	t	f	Kumar	\N	\N	\N	WWW	WWW	223333	Ipoh	\N	\N
1	M.	Knight	Teen	2006-03-01	India	5@6555.com	1321212312	PR	G2322329S	2032-11-11	Defacto	4	8	9	10	21033	t	f	Shyamalan	Male	Malay	\N	1	SIM LIM SQUARE	188504	1	ROCHOR CANAL ROAD	1
\.


--
-- Data for Name: EmployeeBankDetails; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."EmployeeBankDetails" (id, "employeeId", "bankName", "employeeBankingName", "accountNumber", "accountType") FROM stdin;
5	3	Bank of America	Ram K Jethmalani	123445567	Savings
6	7	QWERTY Bank	QAZXSW2222	123456789	Savings
4	1	DBS	Shylock The Tyrant	121231212	Savings
3	5	QWERTY	QAZXSWE-Edit23	12345	Savings
7	2	QWERTY-2	YTREWQ	121231231231	Savings
15	6	QQQQ	QQQQ	1234	Savings
17	13	DBS	John X	322324	Savings
\.


--
-- Data for Name: EmployeeEmergencyContact; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."EmployeeEmergencyContact" (id, "employeeId", "personName", relationship, mobile, address) FROM stdin;
1	2	John Doe	Spouse	+5555590	123 Main St, Anytown, AT 12345
3	2	R	Sibling	1235555533	WWWWW
2	2	R	Sibling	123333333	WWWWW
7	6	QAZXSW	Friend	123	123
8	1	Amitabh Ba	Landlord	5555555555	qwert
4	1	Madhuri Dikshit	Friend	3234234234	Emp-1
9	13	Amitabj	Spouse	23232333	sdfsdfs
10	13	WWWW	Spouse	21232323	sfsfsd
\.


--
-- Data for Name: EmployeeHrDetails; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."EmployeeHrDetails" (id, "employeeId", "dateOfJoining", bonus, "passportNumber", "passportIssueDate", "passportExpiryDate", "passType", "passExpiryDate", "renewalApplyDate", "newApplyDate", "passCancelledDate", remarks, salary, "workpermitNumber", "malaysiaIC") FROM stdin;
6	2	2024-11-26	4.00	Z123456	2024-11-26	2024-11-26		\N	\N	\N	\N	\N	0.00	\N	\N
7	3	2024-10-12	500.00	WASDASASD	2024-11-26	2024-11-26	WP	2024-11-26	2024-11-27	2024-11-27	2024-11-27	123457	0.00	\N	\N
8	7	2024-11-30	111.00	QAZWSX	2024-11-30	2024-11-30	EP	2024-11-29	\N	\N	\N	\N	1000.00	\N	
9	5	2024-12-05	222.00	22222	2024-12-05	2024-12-05	\N	\N	\N	\N	\N	ddd	222.00	\N	\N
3	1	2005-11-07	10000000.00	ZQW123234234	2024-11-25	2024-11-25	EP	2024-11-28	2024-11-26	2024-11-25	\N	Rem-125555	1133333.00	\N	\N
11	6	2024-12-05	1111.00	MG-123-TF	2024-12-05	2024-12-05	\N	\N	\N	\N	\N	2333	111.00	\N	\N
12	13	2023-12-07	300.00	QWEEEEE	2017-12-13	2025-01-31	EP	2025-03-19	2025-01-15	2024-12-26	2024-12-19	Tesla FB employee	200.00	\N	123456789101
\.


--
-- Data for Name: EmployeeHrDetailsClients; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."EmployeeHrDetailsClients" (id, "employeeHrId", "clientId", "assignedDate") FROM stdin;
1	7	4	2024-11-30 09:20:02.07625+00
19	3	4	2024-12-05 12:56:50.672+00
20	3	6	2024-12-05 12:56:50.672+00
27	11	3	2024-12-05 13:04:59.405+00
28	11	4	2024-12-05 13:04:59.405+00
32	12	1	2024-12-06 12:11:55.314+00
\.


--
-- Data for Name: EmployeeLeaveBalance; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."EmployeeLeaveBalance" (id, "employeeId", "leaveTypeId", "totalEntitlement", "usedDays") FROM stdin;
1	1	1	12	5
2	1	2	10	3
3	1	3	90	10
4	2	1	12	2
5	2	4	15	5
6	3	2	10	1
7	3	5	30	12
8	5	3	90	20
9	5	4	15	0
10	6	1	12	6
11	6	2	10	8
12	7	3	90	15
13	7	5	30	5
14	8	4	15	3
15	8	1	12	4
\.


--
-- Data for Name: EmployeeWorkHistory; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."EmployeeWorkHistory" (id, "employeeId", "jobTitle", "startDate", "endDate", department, responsibilities, "technologiesUsed") FROM stdin;
1	1	Software Engineer	2021-01-01	2022-01-01	Engineering	Developed web applications	JavaScript, React, Node.js
2	1	Senior Software Engineer	2022-02-01	\N	Engineering	Led a team of developers	TypeScript, React, Node.js
3	2	Data Analyst	2020-03-01	2021-03-01	Data Science	Analyzed data sets	Python, SQL, Tableau
4	2	Senior Data Analyst	2021-04-01	\N	Data Science	Led data analysis projects	Python, SQL, Power BI
5	3	Project Manager	2019-05-01	2020-05-01	Project Management	Managed software development projects	Agile, Scrum, JIRA
6	3	Senior Project Manager	2020-06-01	\N	Project Management	Oversaw multiple projects	Agile, Scrum, JIRA, Confluence
\.


--
-- Data for Name: Leave; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."Leave" (id, "employeeId", "startDate", "endDate", "leaveTypeId", status, "createdAt") FROM stdin;
29	1	2025-02-10 09:00:00	2025-02-11 18:00:00	3	Approved	2024-12-09 20:05:35.470676
30	1	2025-02-15 09:00:00	2025-02-15 18:00:00	1	Pending	2024-12-09 20:05:35.470676
48	5	2025-01-02 09:00:00	2025-01-02 18:00:00	1	Approved	2024-12-09 20:07:12.892162
49	6	2025-01-10 09:00:00	2025-01-12 18:00:00	2	Pending	2024-12-09 20:07:12.892162
50	7	2025-01-20 09:00:00	2025-01-20 18:00:00	3	Approved	2024-12-09 20:07:12.892162
51	8	2025-01-25 09:00:00	2025-01-26 18:00:00	1	Approved	2024-12-09 20:07:12.892162
52	2	2025-02-05 09:00:00	2025-02-05 18:00:00	2	Pending	2024-12-09 20:07:12.892162
53	3	2025-02-10 09:00:00	2025-02-11 18:00:00	3	Approved	2024-12-09 20:07:12.892162
54	1	2025-01-02 09:00:00	2025-01-02 18:00:00	1	Approved	2024-12-09 20:07:29.087973
55	2	2025-01-10 09:00:00	2025-01-12 18:00:00	2	Pending	2024-12-09 20:07:29.087973
56	1	2025-01-20 09:00:00	2025-01-20 18:00:00	3	Approved	2024-12-09 20:07:29.087973
57	5	2025-01-25 09:00:00	2025-01-26 18:00:00	1	Approved	2024-12-09 20:07:29.087973
58	6	2025-02-05 09:00:00	2025-02-05 18:00:00	2	Pending	2024-12-09 20:07:29.087973
59	7	2025-02-10 09:00:00	2025-02-11 18:00:00	3	Approved	2024-12-09 20:07:29.087973
1	1	2024-12-15 09:00:00	2024-12-15 18:00:00	1	Rejected	2024-12-09 20:05:35.470676
2	1	2024-12-20 09:00:00	2024-12-20 18:00:00	2	Pending	2024-12-09 20:05:35.470676
3	1	2024-12-25 09:00:00	2024-12-26 18:00:00	3	Approved	2024-12-09 20:05:35.470676
4	1	2025-01-02 09:00:00	2025-01-02 18:00:00	1	Approved	2024-12-09 20:05:35.470676
5	1	2025-01-10 09:00:00	2025-01-12 18:00:00	2	Pending	2024-12-09 20:05:35.470676
6	1	2025-01-20 09:00:00	2025-01-20 18:00:00	3	Approved	2024-12-09 20:05:35.470676
7	1	2025-01-25 09:00:00	2025-01-26 18:00:00	1	Approved	2024-12-09 20:05:35.470676
8	1	2025-02-05 09:00:00	2025-02-05 18:00:00	2	Pending	2024-12-09 20:05:35.470676
\.


--
-- Data for Name: LeaveType; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."LeaveType" (id, name, color, "defaultDays", "leaveCode") FROM stdin;
1	Sick Leave	#83E15D	12	SL
2	Casual Leave	#A11BBE	10	CL
3	Maternity Leave	#EB1FEA	90	ML
4	Paternity Leave	#9868C0	15	PL
5	Earned Leave	#5F73CF	30	EL
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."Role" (id, name, level) FROM stdin;
1	SUPERADMIN	1
2	ADMIN	2
3	EMPLOYEE	3
4	MANAGER	4
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."User" (id, name, email, "emailVerified", image, password, "resetToken", "resetTokenExpiry", "createdAt", "updatedAt") FROM stdin;
cm377xm0p0000lww055ynb4do	admin	admin	\N	\N	$2b$10$f4blSmgkQjj9Iaum9AmWl.5y/0RCYLlhh9CG1w8n64OhoEl4DH3mW	\N	\N	2024-11-07 11:22:25.85	2024-11-07 11:22:25.85
cm3781jc60001lww0laz2icss	admin2	admin23	\N	\N	$2b$10$Kz/UYypdo2b/QTq07JxWne1DT2sY88e3bVsYWBQkJk5NJqZSBlf1a	\N	\N	2024-11-07 11:25:28.998	2024-11-07 11:25:28.998
cm3h8ecfi00009mh3r94k59pm	employee	employee	\N	\N	$2b$10$nyYHBSuPejTfU.DdUjilSuSNDQFjc4IjWhSXxt/6r06AShTqPMV1y	\N	\N	2024-11-14 11:33:08.332	2024-11-14 11:33:08.332
\.


--
-- Data for Name: UserEmployee; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."UserEmployee" (id, "userId", "employeeId") FROM stdin;
1	cm3h8ecfi00009mh3r94k59pm	1
\.


--
-- Data for Name: UserRole; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."UserRole" (user_id, role_id) FROM stdin;
cm377xm0p0000lww055ynb4do	1
cm3781jc60001lww0laz2icss	1
cm3h8ecfi00009mh3r94k59pm	3
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: nanosoft-suite_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5ab8a09c-913e-412d-ab88-e8574efd76f7	7bf41870950bd2ef514ae332db02d7c1a67b27d679f3af3aa7845a2d4a9d1a67	2024-11-07 10:52:57.474358+00	20241024125007_init	\N	\N	2024-11-07 10:52:56.006441+00	1
d8d0b6d0-0b91-46b8-b981-eef774492e91	254957325297579f210e0682d56f31a2876ccb5aa5a8de34a898ba13da4de9ed	2024-11-07 10:53:19.531233+00	20241107105316_update_date_of_birth_to_date	\N	\N	2024-11-07 10:53:18.248309+00	1
a434d14d-5609-45fb-b2b4-20266ab35d98	44a8a54222720845c717718d0cc8d84e6da6fd1d98397f1f04b14a4fda12ba3c	2024-11-08 09:29:51.428713+00	20241108092948_add_default_values	\N	\N	2024-11-08 09:29:50.098535+00	1
\.


--
-- Name: EmployeeHrDetailsClients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public."EmployeeHrDetailsClients_id_seq"', 32, true);


--
-- Name: EmployeeLeaveBalance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public."EmployeeLeaveBalance_id_seq"', 15, true);


--
-- Name: Leave_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public."Leave_Type_id_seq"', 29, true);


--
-- Name: Leave_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public."Leave_id_seq"', 59, true);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public."Role_id_seq"', 4, true);


--
-- Name: UserEmployee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public."UserEmployee_id_seq"', 1, true);


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public.client_id_seq', 6, true);


--
-- Name: employee_bank_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public.employee_bank_details_id_seq', 17, true);


--
-- Name: employee_emergency_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public.employee_emergency_contact_id_seq', 10, true);


--
-- Name: employee_hr_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public.employee_hr_details_id_seq', 13, true);


--
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public.employee_id_seq', 13, true);


--
-- Name: employee_work_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nanosoft-suite_owner
--

SELECT pg_catalog.setval('public.employee_work_history_id_seq', 6, true);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: EmployeeHrDetailsClients EmployeeHrDetailsClients_employeeHrId_clientId_key; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetailsClients"
    ADD CONSTRAINT "EmployeeHrDetailsClients_employeeHrId_clientId_key" UNIQUE ("employeeHrId", "clientId");


--
-- Name: EmployeeHrDetailsClients EmployeeHrDetailsClients_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetailsClients"
    ADD CONSTRAINT "EmployeeHrDetailsClients_pkey" PRIMARY KEY (id);


--
-- Name: EmployeeLeaveBalance EmployeeLeaveBalance_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeLeaveBalance"
    ADD CONSTRAINT "EmployeeLeaveBalance_pkey" PRIMARY KEY (id);


--
-- Name: LeaveType Leave_Type_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."LeaveType"
    ADD CONSTRAINT "Leave_Type_pkey" PRIMARY KEY (id);


--
-- Name: Leave Leave_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Leave"
    ADD CONSTRAINT "Leave_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_name_key; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_name_key" UNIQUE (name);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: UserEmployee UserEmployee_employeeId_key; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserEmployee"
    ADD CONSTRAINT "UserEmployee_employeeId_key" UNIQUE ("employeeId");


--
-- Name: UserEmployee UserEmployee_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserEmployee"
    ADD CONSTRAINT "UserEmployee_pkey" PRIMARY KEY (id);


--
-- Name: UserEmployee UserEmployee_userId_employeeId_key; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserEmployee"
    ADD CONSTRAINT "UserEmployee_userId_employeeId_key" UNIQUE ("userId", "employeeId");


--
-- Name: UserEmployee UserEmployee_userId_key; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserEmployee"
    ADD CONSTRAINT "UserEmployee_userId_key" UNIQUE ("userId");


--
-- Name: UserRole User_Role_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "User_Role_pkey" PRIMARY KEY (user_id, role_id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Client client_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: EmployeeBankDetails employee_bank_details_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeBankDetails"
    ADD CONSTRAINT employee_bank_details_employee_id_key UNIQUE ("employeeId");


--
-- Name: EmployeeBankDetails employee_bank_details_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeBankDetails"
    ADD CONSTRAINT employee_bank_details_pkey PRIMARY KEY (id);


--
-- Name: EmployeeEmergencyContact employee_emergency_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeEmergencyContact"
    ADD CONSTRAINT employee_emergency_contact_pkey PRIMARY KEY (id);


--
-- Name: EmployeeHrDetails employee_hr_details_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetails"
    ADD CONSTRAINT employee_hr_details_employee_id_key UNIQUE ("employeeId");


--
-- Name: EmployeeHrDetails employee_hr_details_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetails"
    ADD CONSTRAINT employee_hr_details_pkey PRIMARY KEY (id);


--
-- Name: Employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- Name: EmployeeWorkHistory employee_work_history_pkey; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeWorkHistory"
    ADD CONSTRAINT employee_work_history_pkey PRIMARY KEY (id);


--
-- Name: LeaveType name_unique; Type: CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."LeaveType"
    ADD CONSTRAINT name_unique UNIQUE (name);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: employee_email_key; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX employee_email_key ON public."Employee" USING btree (email);


--
-- Name: employee_nric_or_fin_no_key; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX employee_nric_or_fin_no_key ON public."Employee" USING btree ("nricOrFinNo");


--
-- Name: idx_employee_hr_details_clients_client_id; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE INDEX idx_employee_hr_details_clients_client_id ON public."EmployeeHrDetailsClients" USING btree ("clientId");


--
-- Name: idx_employee_hr_details_clients_employee_hr_id; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE INDEX idx_employee_hr_details_clients_employee_hr_id ON public."EmployeeHrDetailsClients" USING btree ("employeeHrId");


--
-- Name: idx_employeeleavebalance_employee; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE INDEX idx_employeeleavebalance_employee ON public."EmployeeLeaveBalance" USING btree ("employeeId");


--
-- Name: idx_employeeleavebalance_leavetype; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE INDEX idx_employeeleavebalance_leavetype ON public."EmployeeLeaveBalance" USING btree ("leaveTypeId");


--
-- Name: idx_useremployee_employeeid; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE INDEX idx_useremployee_employeeid ON public."UserEmployee" USING btree ("employeeId");


--
-- Name: idx_useremployee_userid; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE INDEX idx_useremployee_userid ON public."UserEmployee" USING btree ("userId");


--
-- Name: leave_code_unique_idx; Type: INDEX; Schema: public; Owner: nanosoft-suite_owner
--

CREATE UNIQUE INDEX leave_code_unique_idx ON public."LeaveType" USING btree ("leaveCode") WHERE (("leaveCode")::text <> ''::text);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Leave Leave_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Leave"
    ADD CONSTRAINT "Leave_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id);


--
-- Name: Leave Leave_leaveTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Leave"
    ADD CONSTRAINT "Leave_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES public."LeaveType"(id);


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserEmployee UserEmployee_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserEmployee"
    ADD CONSTRAINT "UserEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON DELETE CASCADE;


--
-- Name: UserEmployee UserEmployee_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserEmployee"
    ADD CONSTRAINT "UserEmployee_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE;


--
-- Name: UserRole User_Role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "User_Role_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON DELETE CASCADE;


--
-- Name: UserRole User_Role_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "User_Role_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON DELETE CASCADE;


--
-- Name: EmployeeBankDetails employee_bank_details_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeBankDetails"
    ADD CONSTRAINT employee_bank_details_employee_id_fkey FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON DELETE CASCADE;


--
-- Name: EmployeeEmergencyContact employee_emergency_contact_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeEmergencyContact"
    ADD CONSTRAINT employee_emergency_contact_employee_id_fkey FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON DELETE CASCADE;


--
-- Name: EmployeeHrDetails employee_hr_details_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetails"
    ADD CONSTRAINT employee_hr_details_employee_id_fkey FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON DELETE CASCADE;


--
-- Name: EmployeeWorkHistory employee_work_history_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeWorkHistory"
    ADD CONSTRAINT employee_work_history_employee_id_fkey FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON DELETE CASCADE;


--
-- Name: EmployeeLeaveBalance employeeleavebalance_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeLeaveBalance"
    ADD CONSTRAINT employeeleavebalance_employeeid_fkey FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id);


--
-- Name: EmployeeLeaveBalance employeeleavebalance_leavetypeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeLeaveBalance"
    ADD CONSTRAINT employeeleavebalance_leavetypeid_fkey FOREIGN KEY ("leaveTypeId") REFERENCES public."LeaveType"(id);


--
-- Name: EmployeeHrDetailsClients fk_client; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetailsClients"
    ADD CONSTRAINT fk_client FOREIGN KEY ("clientId") REFERENCES public."Client"(id) ON DELETE CASCADE;


--
-- Name: EmployeeHrDetailsClients fk_employee_hr_details; Type: FK CONSTRAINT; Schema: public; Owner: nanosoft-suite_owner
--

ALTER TABLE ONLY public."EmployeeHrDetailsClients"
    ADD CONSTRAINT fk_employee_hr_details FOREIGN KEY ("employeeHrId") REFERENCES public."EmployeeHrDetails"(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: nanosoft-suite_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

