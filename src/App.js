import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import jsPDF from "jspdf";
import placeHolder from "./placeholder.png";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [awards, setAwards] = useState("");
  const [experiences, setExperiences] = useState([
    {
      companyName: "",
      designation: "",
      location: "",
      startDate: "",
      endDate: "",
      jobRole: "",
      headline: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      name: "",
      course: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      headline: "",
    },
  ]);
  const [flag, setFlag] = useState(1);
  const [flagEdu, setFlagEdu] = useState(1);

  experiences.forEach((element) => {
    element.headline =
      element.companyName.toUpperCase() +
      ", " +
      element.location.charAt(0).toUpperCase() +
      element.location.slice(1) +
      " - " +
      element.designation;
  });
  education.forEach((element) => {
    element.headline =
      element.name.toUpperCase() +
      ", " +
      element.location.charAt(0).toUpperCase() +
      element.location.slice(1) +
      " - " +
      element.description;
  });
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index][name] = value;
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        companyName: "",
        designation: "",
        location: "",
        startDate: "",
        endDate: "",
        jobRole: "",
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };
  const handleInputChangeEducation = (index, event) => {
    const { name, value } = event.target;
    const updatedEducation = [...education];
    updatedEducation[index][name] = value;
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        name: "",
        course: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePDF = () => {
    const pdf = new jsPDF();
    if (image) pdf.addImage(image, "JPEG/JPG/PNG", 160, 10, 30, 40);
    else
      pdf.addImage("https://placehold.co/300x200/png", "PNG", 160, 10, 30, 30);
    // pdf.addImage(placeHolder, "PNG", 5, 10, 30,30);
    pdf.setFontSize(20);
    pdf.text(15, 20, `${name.toUpperCase()}`);
    pdf.setFontSize(15);
    pdf.setTextColor(0, 255, 0);
    pdf.text(15, 28, `Software Developer`);
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(15, 35, address);
    pdf.setTextColor(128, 128, 128);
    pdf.text(15, 40, mobile);
    pdf.setTextColor(128, 128, 128);
    pdf.text(15, 44, email);
    pdf.setTextColor(1, 50, 32);
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");
    pdf.text(15, 55, "SKILLS");
    var maxWordsPerLine = 15;
    var words = skills.split(" ");
    var lines = [];
    var currentLine = [];
    var k = 0;
    for (var i = 0; i < words.length; i++) {
      currentLine.push(words[i]);

      if (currentLine.length === maxWordsPerLine) {
        lines.push(currentLine.join(" "));
        currentLine = [];
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine.join(" "));
    }
    const breakTextIntoLines = (text, wordLimit) => {
      const wordsRole = text.split(" ");
      const linesRole = [];
      let currentLineRole = "";

      for (const word of wordsRole) {
        if ((currentLineRole + word).length <= wordLimit) {
          currentLineRole += word + " ";
        } else {
          linesRole.push(currentLineRole.trim());
          currentLineRole = word + " ";
        }
      }

      if (currentLineRole.trim() !== "") {
        linesRole.push(currentLineRole.trim());
      }

      return linesRole;
    };
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "");
    pdf.setTextColor(0, 0, 0);
    for (var j = 0; j < lines.length; j++) {
      pdf.text(15, 62 + j * 5, lines[j]);
    }
    pdf.setTextColor(1, 50, 32);
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");
    pdf.text(15, j === 0 ? 68 : 70 + j * 5, "EXPERIENCE");
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);

    let yCoordinate = j === 0 ? 68 : 78 + j * 5;
    experiences.forEach((experience) => {
      // Add headline
      pdf.setFont("helvetica", "italic");
      pdf.text(15, yCoordinate, experience.headline);
      yCoordinate += 5;
      pdf.setFont("helvetica", "");
      pdf.setTextColor(1, 50, 32);
      pdf.setFontSize(8);
      pdf.text(
        15,
        yCoordinate,
        `${experience.startDate.slice(0, experience.startDate.length - 3)} - ${
          experience.endDate
            ? experience.startDate.slice(0, experience.startDate.length - 3)
            : "present"
        }`
      );
      yCoordinate += 5;
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      const jobRoleLines = breakTextIntoLines(experience.jobRole, 121);
      jobRoleLines.forEach((line) => {
        pdf.text(15, yCoordinate, line);
        yCoordinate += 5;
      });

      yCoordinate += 5;
    });

    pdf.setTextColor(1, 50, 32);
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");
    pdf.text(15, yCoordinate, "Education");
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    let yCoordinateEdu = yCoordinate + 5;
    education.forEach((educationItem) => {
      // Add headline
      pdf.setFont("helvetica", "italic");
      pdf.text(15, yCoordinateEdu, educationItem.headline);
      yCoordinateEdu += 5;
      pdf.setFont("helvetica", "");
      pdf.setTextColor(1, 50, 32);
      pdf.setFontSize(8);
      pdf.text(
        15,
        yCoordinateEdu,
        `${educationItem.startDate.slice(
          0,
          educationItem.startDate.length - 3
        )} - ${
          educationItem.endDate
            ? educationItem.startDate.slice(
                0,
                educationItem.startDate.length - 3
              )
            : "present"
        }`
      );
      yCoordinateEdu += 5;
      // pdf.text(15, yCoordinateEdu, `End Date: ${educationItem.endDate}`);
      // yCoordinateEdu += 10;

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      const jobRoleLines = breakTextIntoLines(educationItem.description, 121);
      jobRoleLines.forEach((line) => {
        pdf.text(15, yCoordinateEdu, line);
        yCoordinateEdu += 5; // Adjust the spacing between lines
      });

      yCoordinateEdu += 5; // Adjust the spacing between experiences
    });
    pdf.setTextColor(1, 50, 32);
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");
    pdf.text(15, yCoordinateEdu, "Awards & Achievements");
    pdf.setFont("helvetica", "");
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    const jobRoleLines = breakTextIntoLines(awards, 121);
    jobRoleLines.forEach((line) => {
      pdf.text(15, yCoordinateEdu + 5, line);
      yCoordinate += 5; // Adjust the spacing between lines
    });
    pdf.save("resume.pdf");
  };
  console.log(education, "edu");
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100vw",
          marginLeft: "10rem",
          marginTop: "2rem",
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mobile:</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Skills:</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter skills seperated by ',' "
        />
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {experiences.map((experience, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100vw",
                marginLeft: "4rem",
                marginTop: "2rem",
              }}
            >
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={experience.companyName}
                onChange={(e) => handleInputChange(index, e)}
              />
              <label>Designation:</label>
              <input
                type="text"
                name="designation"
                value={experience.designation}
                onChange={(e) => handleInputChange(index, e)}
              />
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={experience.location}
                onChange={(e) => handleInputChange(index, e)}
              />

              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={experience.startDate}
                onChange={(e) => handleInputChange(index, e)}
              />
              <label>End Date:</label>
              <input
                type="date"
                disabled={experiences[index].startDate === "" ? true : false}
                min={experience.startDate ? experience.startDate : Date.now()}
                name="endDate"
                value={experience.endDate}
                onChange={(e) => handleInputChange(index, e)}
              />
              <label>Job Role:</label>
              <input
                type="text"
                name="jobRole"
                value={experience.jobRole}
                onChange={(e) => handleInputChange(index, e)}
              />
              <br />
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveExperience(index);
                    setFlag(flag - 1);
                  }}
                >
                  Remove
                </button>
              )}
              <button
                style={{ marginTop: "2rem", marginLeft: "2rem" }}
                type="button"
                disabled={flag < 3 ? false : true}
                onClick={() => {
                  handleAddExperience();
                  setFlag(flag + 1);
                }}
              >
                Add Experience
              </button>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {education.map((educationItem, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100vw",
                marginLeft: "4rem",
                marginTop: "2rem",
              }}
            >
              <label>Company Name:</label>
              <input
                type="text"
                name="name"
                value={educationItem.name}
                onChange={(e) => handleInputChangeEducation(index, e)}
              />
              <label>Designation:</label>
              <input
                type="text"
                name="course"
                value={educationItem.course}
                onChange={(e) => handleInputChangeEducation(index, e)}
              />
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={educationItem.location}
                onChange={(e) => handleInputChangeEducation(index, e)}
              />

              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={educationItem.startDate}
                onChange={(e) => handleInputChangeEducation(index, e)}
              />
              <label>End Date:</label>
              <input
                type="date"
                disabled={education[index].startDate === "" ? true : false}
                min={
                  educationItem.startDate ? educationItem.startDate : Date.now()
                }
                name="endDate"
                value={educationItem.endDate}
                onChange={(e) => handleInputChangeEducation(index, e)}
              />
              <label>Job Role:</label>
              <input
                type="text"
                name="description"
                value={educationItem.description}
                onChange={(e) => handleInputChangeEducation(index, e)}
              />
              <br />
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveEducation(index);
                    setFlagEdu(flagEdu - 1);
                  }}
                >
                  Remove
                </button>
              )}
              <button
                style={{ marginTop: "4rem" }}
                type="button"
                disabled={flagEdu < 3 ? false : true}
                onClick={() => {
                  handleAddEducation();
                  setFlagEdu(flagEdu + 1);
                }}
              >
                Add Education
              </button>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100vw",
          marginLeft: "8rem",
          marginTop: "2rem",
        }}
      >
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <label>Awards and Achievement</label>
        <input
          type="text"
          value={awards}
          onChange={(e) => setAwards(e.target.value)}
        />
      </div>
      <button
        style={{
          margin: "2rem auto",
          padding: "1rem 2rem",
          marginLeft: "46.5%",
        }}
        onClick={handleGeneratePDF}
      >
        Generate PDF
      </button>
    </div>
  );
}

export default App;
