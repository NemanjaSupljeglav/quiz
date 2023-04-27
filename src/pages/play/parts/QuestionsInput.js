/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Grid, Tooltip, IconButton, Box } from "@mui/material/core";
import HighlightOffIcon from "@mui/material/icons/HighlightOff";

// Atoms
import Input from "Components/atoms/inputs/Input";
import Button from "Components/atoms/buttons/Button";
import SelectList from "Components/atoms/inputs/SelectList";

const BankInputs = ({
  list,
  validationProps,
  accountTypeList,
  bankList,
  handleChange,
  handleRemove,
  handleAdd,
  disabled
}) => {
  const { t } = useTranslation();

  return (
    <Box className="boxBorder">
      <Grid container spacing={3} alignItems="center">
        {list?.map((item, i) => {
          return (
            <>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Input
                  label={t("Transakcijski račun")}
                  value={item?.account_number}
                  type="text"
                  disabled={disabled}
                  onChange={e => {
                    handleChange(
                      list.map((x, index) =>
                        i === index
                          ? {
                              ...x,
                              account_number: e
                            }
                          : x
                      )
                    );
                  }}
                  validation={t(
                    validationProps &&
                      validationProps[i]?.account_number &&
                      validationProps[i]?.account_number.length > 0 &&
                      validationProps[i]?.account_number[0]
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <SelectList
                  label={t("Banka")}
                  value={item?.bank_id}
                  lists={bankList || []}
                  disabled={disabled}
                  onChange={e => {
                    handleChange(
                      list.map((x, index) =>
                        i === index
                          ? {
                              ...x,
                              bank_id: e
                            }
                          : x
                      )
                    );
                  }}
                  validation={t(
                    validationProps &&
                      validationProps[i]?.bank_id &&
                      validationProps[i]?.bank_id.length > 0 &&
                      validationProps[i]?.bank_id[0]
                  )}
                  dataCy="banka"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                xl={3}
                style={{ display: "flex" }}
              >
                <Input
                  label={t("Opis")}
                  value={item?.description}
                  disabled={disabled}
                  onChange={e => {
                    handleChange(
                      list.map((x, index) =>
                        i === index
                          ? {
                              ...x,
                              description: e
                            }
                          : x
                      )
                    );
                  }}
                  validation={t(
                    validationProps &&
                      validationProps[i]?.description &&
                      validationProps[i]?.description.length > 0 &&
                      validationProps[i]?.description[0]
                  )}
                  dataCy="opis"
                />
                {!disabled && (
                  <Tooltip title="Ukloni ovaj podatak">
                    <IconButton
                      style={{ marginTop: "15px" }}
                      onClick={() => handleRemove(i)}
                      dataCy="deleteThisData"
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </>
          );
        })}
        {!disabled && (
          <Grid
            item
            xs={12}
            sm={12}
            md={2}
            lg={1}
            xl={1}
            // style={{ padding: "0px" }}
          >
            <Button
              fullWidth
              label={t("+ novi podatak")}
              customStyle={{ margin: "10px 0px", width: "max-content" }}
              onClick={() => {
                handleAdd();
              }}
              size="small"
              dataCy="addNewData"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default BankInputs;
