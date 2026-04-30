import { IMuscleDao } from "balanced-gym-model";
import L from "../../common/logger";
import { MuscleDocumentModel } from "../mongoose/muscle.mongoose";

export interface IMuscleCreate {
  name: string;
  muscleURL?: string;
}

export class MuscleService {
  async getAllMuscles(): Promise<IMuscleDao[]> {
    L.info("fetch all muscles");
    const muscles: IMuscleDao[] = await MuscleDocumentModel.find()
      .select("name muscleURL")
      .sort("name")
      .lean()
      .exec();
    return muscles;
  }

  async createMuscle(data: IMuscleCreate): Promise<IMuscleDao> {
    L.info(`creating muscle: ${data.name}`);
    const muscle = await new MuscleDocumentModel(data).save();
    return muscle.toObject();
  }

  async updateMuscle(muscleId: string, data: Partial<IMuscleCreate>): Promise<IMuscleDao> {
    L.info(`updating muscle ${muscleId}`);
    const muscle: IMuscleDao = await MuscleDocumentModel.findOneAndUpdate(
      { _id: muscleId },
      data,
      { new: true }
    )
      .lean()
      .exec();
    return muscle;
  }
}

export default new MuscleService();
