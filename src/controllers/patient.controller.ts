import { Response, Request } from "express";
import { Patient } from "../interface/patient";
import { connection } from "../config/mysql.config";
import { QUERY } from "../queries/patient.queries";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { ResultSetHeader } from "mysql2";

export const getPatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.info(
    `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  try {
    const pool = await connection();
    const result: any = await pool.query(QUERY.SELECT_PATIENTS);
    res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          "Patients retrieved successfully",
          result[0]
        )
      );
  } catch (error: unknown) {
    console.error(error);
    res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occured"
        )
      );
  }
};

export const getPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.info(
    `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  try {
    const pool = await connection();
    const result: any = await pool.query(QUERY.SELECT_PATIENT, [
      req.params.patientId,
    ]);
    if ((result[0] as Array<any>).length > 0) {
      res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            "Patient retrieved successfully",
            result[0]
          )
        );
    } else {
      res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Patient not found"
          )
        );
    }
  } catch (error: unknown) {
    console.error(error);
    res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occured"
        )
      );
  }
};

export const createPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.info(
    `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  let patient: Patient = { ...req.body };

  try {
    const pool = await connection();
    const result: any = await pool.query(
      QUERY.CREATE_PATIENT,
      Object.values(patient)
    );
    patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
    res
      .status(Code.CREATED)
      .send(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          "Patient created successfully",
          patient
        )
      );
  } catch (error: unknown) {
    console.error(error);
    res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occured"
        )
      );
  }
};

export const updatePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.info(
    `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  let patient: Patient = { ...req.body };

  try {
    const pool = await connection();
    const result: any = await pool.query(QUERY.SELECT_PATIENT, [
      req.params.patientId,
    ]);
    if ((result[0] as Array<any>).length > 0) {
      const result: any = await pool.query(QUERY.UPDATE_PATIENT, [
        ...Object.values(patient),
        req.params.patientId,
      ]);
      res.status(Code.OK).send(
        new HttpResponse(Code.OK, Status.OK, "Patient updated successfully", {
          ...patient,
          id: req.params.patientId,
        })
      );
    } else {
      res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Patient not found"
          )
        );
    }
  } catch (error: unknown) {
    console.error(error);
    res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occured"
        )
      );
  }
};

export const deletePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.info(
    `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  try {
    const pool = await connection();
    const result: any = await pool.query(QUERY.SELECT_PATIENT, [
      req.params.patientId,
    ]);
    if ((result[0] as Array<any>).length > 0) {
      const result: any = await pool.query(QUERY.DELETE_PATIENT, [
        req.params.patientId,
      ]);
      res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, "Patient deleted successfully")
        );
    } else {
      res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Patient not found"
          )
        );
    }
  } catch (error: unknown) {
    console.error(error);
    res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An error occured"
        )
      );
  }
};
