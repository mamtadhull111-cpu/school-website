import { PageHero } from "@/components/PageHero";

const sections = [
  {
    title: "A. General Information",
    rows: [
      ["Name of the School", "Green Valley Public School"],
      ["Affiliation No.", "530831"],
      ["School Code", "50312"],
      ["Complete Address with Pin Code", "Village Pai, Tehsil Kaithal, District Kaithal, Haryana – 136027"],
      ["Principal Name & Qualification", "Mr. Dharamvir Singh, M.A., B.Ed."],
      ["School Email ID", "greenvalleypai@gmail.com"],
      ["Contact No.", "+91-9812345678"],
      ["Year of Establishment", "2006"],
      ["Whether NOC from State/UT Obtained", "Yes"],
      ["NOC No.", "276/2006"],
      ["NOC Issuing Date", "12-04-2006"],
      ["Is the School is Recognised?", "Yes"],
      ["Status of Affiliation", "Provisional"],
      ["Affiliation with the Board since", "2008"],
      ["Extension of Affiliation up to", "31-03-2026"],
      ["Name of Trust / Society / Company Registered under Section 25 of the Company Act 1956", "Green Valley Education Society"],
      ["Period up to which Registration of Trust/Society is valid", "Permanent"],
      ["List of Members of School Managing Committee", "Available on Request"],
      ["Name & Official Address of the Manager/President/Chairman/Correspondent", "Sh. Rajesh Kumar, Village Pai, Kaithal, Haryana"],
      ["Area of School Campus", "2.5 Acres"],
      ["Area of Built-up Area (sq. mt.)", "2800 sq. mt."],
      ["Area of Playground in Sq. mt.", "3600 sq. mt."],
      ["Other Facilities", "Canteen, Parking, Medical Room, Activity Room"],
    ],
  },
  {
    title: "B. Documents and Information",
    rows: [
      ["Copies of Affiliation/Upgradation Letter and recent Extension of Affiliation, if any", "Available"],
      ["Copies of Societies/Trust/Company Registration/Renewal Certificate", "Available"],
      ["Copy of No Objection Certificate (NOC) issued", "Available"],
      ["Copies of Recognition Certificate under RTE Act 2009", "Available"],
      ["Copy of Valid Building Safety Certificate", "Available"],
      ["Copy of Valid Fire Safety Certificate", "Available"],
      ["Copy of the DEO Certificate Submitted by the School for Affiliation", "Available"],
      ["Copies of Valid Water, Health and Sanitation Certificates", "Available"],
    ],
  },
  {
    title: "C. Result and Academics",
    rows: [
      ["Fee Structure of the School", "Available on School Notice Board & Office"],
      ["Annual Academic Calendar", "Available"],
      ["List of School Management Committee (SMC)", "Available on Request"],
      ["List of Parents Teachers Association (PTA) Members", "Available on Request"],
      ["Last Three-Year Result of the Board Examination", "Available"],
    ],
  },
  {
    title: "D. Staff (Teaching)",
    rows: [
      ["Principal", "1"],
      ["Total No. of Teachers (PGT)", "8"],
      ["Total No. of Teachers (TGT)", "14"],
      ["Total No. of Teachers (PRT)", "18"],
      ["Teachers Section Ratio", "1:1.5"],
      ["Details of Special Educator", "1"],
      ["Details of Counsellor and Wellness Teacher", "1"],
    ],
  },
  {
    title: "E. School Infrastructure",
    rows: [
      ["Total No. of Class Rooms", "28"],
      ["Size of Class Rooms (sq. ft.)", "500 sq. ft."],
      ["No. and Size of Laboratories (sq. ft.)", "4 Labs – Physics, Chemistry, Biology, Computer (each ~600 sq. ft.)"],
      ["Internet Facility", "Yes (Broadband + Wi-Fi)"],
      ["No. of Girls Toilets", "12"],
      ["No. of Boys Toilets", "14"],
      ["Link of YouTube Video of the School", "https://www.youtube.com/@GreenValleyPai"],
    ],
  },
];

const PublicDisclosure = () => {
  return (
    <>
      <PageHero
        title="Public Disclosure"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Public Disclosure" }]}
      />

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <h2 className="text-xl font-bold text-primary md:text-2xl">
              Official CBSE Mandatory Disclosures
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              As per CBSE Affiliation Bye-Laws, the following information is mandatorily disclosed for
              Green Valley Public School, Pai, Kaithal, Haryana.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <div className="bg-primary px-6 py-3">
                  <h3 className="font-semibold text-white text-base md:text-lg">{section.title}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {section.rows.map(([label, value], idx) => (
                        <tr
                          key={label}
                          className={idx % 2 === 0 ? "bg-white" : "bg-muted/40"}
                        >
                          <td className="w-1/2 border-b border-border px-5 py-3 font-medium text-foreground">
                            {label}
                          </td>
                          <td className="w-1/2 border-b border-border px-5 py-3 text-muted-foreground">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Last Updated: April 2025 &nbsp;|&nbsp; For queries, contact:{" "}
            <a href="mailto:greenvalleypai@gmail.com" className="text-primary underline underline-offset-2">
              greenvalleypai@gmail.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default PublicDisclosure;
