// React
import React, { useState, useEffect, useContext } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";

// MUI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TooltipIconButton from "../../components/atoms/TooltipIconButton";
import Button from "../../components/atoms/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import AddIcon from "@mui/icons-material/Add";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import QuestionForm from "./parts/QuestionsInput";
//molecules
import FullScreenDialog from "../../components/molecules/FullScreenDialog";
import Dialog from "../../components/molecules/Dialog";

//Context
import { GlobalContext } from "../../context/globalState";

// Actions

// Atoms

// Molecules

const API = process.env.MAIN_API_URL;

const Quiz = () => {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  // States
  const [openDialogAddNew, setOpenDialogAddNew] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState(
    Array(16).fill({ question: "", answer: "" })
  );
  const [questionType, setQuestionType] = useState("");
  const [openDialogPlay, setOpenDialogPlay] = useState(false);
  const [openDialogWarning, setOpenDialogWarning] = useState(false);

  useEffect(() => {
    context?.getAllQuizzes();
  }, []);

  const handleOpenAddDialog = () => {
    setOpenDialogAddNew(!openDialogAddNew);
  };
  const handleEditClick = (event, dataIndex) => {
    console.log("iconica");
  };
  const handleEditClickRow = (event, dataIndex) => {
    console.log("roww", event, "-event", dataIndex);
  };
  const handlePlay = id => {
    navigate("/play/5000");
  };
  const contentAddNewQuizDialog = (
    <Grid
      container
      item
      xs={12}
      sm={12}
      md={12}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Input label="Quzi title" value={quizTitle} onChange={setQuizTitle} />
      </Grid>
      <QuestionForm questions={questions} setQuestions={setQuestions} />

      {/*       <Grid item xs={12} sm={6} md={6} className="boxBorder">
        <Input multiline rows={3} label="Pitanje" />
        <Input label="Odgovor" />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Select label="Stara pitanja" />
      </Grid>
      <Grid item xs={12} sm={12} md={12} className="center">
        <TooltipIconButton
          tooltipTxt="Dodaj novo pitanje"
          handleClick={() => setQuestionType("new")}
          icon={<AddIcon />}
        />

        <TooltipIconButton
          tooltipTxt="Izaberi staro pitanje"
          handleClick={() => setQuestionType("old")}
          icon={<RestoreFromTrashIcon />}
        />
      </Grid> */}
    </Grid>
  );
  /*
  const DialogContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography >
          {t("Jeste li sigurni da želite obrisati premiju?")}
        </Typography>
      </Grid>
    </Grid>
  );
  */

  const columns = [
    {
      name: "name",
      field: "name",
      label: "Naziv kviza",
      options: {
        sort: false,
        customBodyRender: (value, dataIndex) => {
          return <>{value}</>;
        }
      }
    },
    {
      name: "name",
      field: "name",
      label: "Broj pitanja",
      options: {
        sort: false,
        customBodyRender: (value, dataIndex) => {
          return <>{value}</>;
        }
      }
    },

    {
      name: "Akcije",
      options: {
        sort: false,
        customBodyRender: (value, dataIndex) => {
          return (
            <div style={{ display: "inline-flex" }}>
              <TooltipIconButton
                tooltipTxt="Pregled stavki RAS datoteke"
                handleClick={() => {
                  handlePlay("id");
                }}
                icon={<PlayCircleOutlineIcon />}
              />
              <TooltipIconButton
                tooltipTxt="Brisanje RAS-a i stavki iz RAS-a"
                handleClick={event => {
                  event.stopPropagation();
                  handleEditClick(event, dataIndex);
                }}
                icon={<DeleteOutlineIcon />}
              />
            </div>
          );
        }
      }
    }
  ];

  const options = {
    filterType: "dropdown",
    filter: false,
    responsive: "standard",
    selectableRows: "none",
    download: false,
    print: false,
    viewColumns: false,
    search: false,
    pagination: false,
    onRowClick: handleEditClickRow,
    customToolbar: () => {
      return (
        <Button
          label="+ novi kviz"
          variant="text"
          onClick={() => handleOpenAddDialog()}
          size="small"
        />
      );
    },
    setRowProps: () => ({
      style: { cursor: "pointer" }
    })
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} mx={3} md={12} mt={3}>
          <MUIDataTable
            title="Tabela dostupnih kvizova"
            data={context?.quizzes?.data}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
      <FullScreenDialog
        opened={openDialogAddNew}
        handleClose={handleOpenAddDialog}
        onAccept={() => {}}
        acceptBtnLabel="Save"
        closeBtnLabel="Close"
        content={contentAddNewQuizDialog}
        title="Add New Quiz"
      />
    </>
  );
};

export default Quiz;
