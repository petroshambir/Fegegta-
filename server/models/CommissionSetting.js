
import mongoose from 'mongoose'

const commissionSettingSchema =
  new mongoose.Schema(
    {
      commissionRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 10,
      },
    },
    {
      timestamps: true,
    }
  )

const CommissionSetting =
  mongoose.models.CommissionSetting ||
  mongoose.model(
    'CommissionSetting',
    commissionSettingSchema
  )

export default CommissionSetting

