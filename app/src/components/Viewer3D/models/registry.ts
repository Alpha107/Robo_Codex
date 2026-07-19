import type { ComponentType } from 'react';
import ArduinoUnoModel, { ARDUINO_PIN_POSITIONS } from './ArduinoUnoModel';
import HcSr04Model, { HC_SR04_PIN_POSITIONS } from './HcSr04Model';
import ServoModel, { SERVO_PIN_POSITIONS } from './ServoModel';
import ArduinoNanoModel, { ARDUINO_NANO_PIN_POSITIONS } from './ArduinoNanoModel';
import ArduinoProMiniModel, { ARDUINO_PRO_MINI_PIN_POSITIONS } from './ArduinoProMiniModel';
import ArduinoLeonardoModel, { ARDUINO_LEONARDO_PIN_POSITIONS } from './ArduinoLeonardoModel';
import ArduinoMicroModel, { ARDUINO_MICRO_PIN_POSITIONS } from './ArduinoMicroModel';
import ATtiny85Model, { ATTINY85_PIN_POSITIONS } from './ATtiny85Model';
import ESP32Model, { ESP32_PIN_POSITIONS } from './ESP32Model';
import ESP8266Model, { ESP8266_PIN_POSITIONS } from './ESP8266Model';
import RaspberryPiPicoModel, { RASPBERRY_PI_PICO_PIN_POSITIONS } from './RaspberryPiPicoModel';
import STM32BluePillModel, { STM32_BLUE_PILL_PIN_POSITIONS } from './STM32BluePillModel';
import MicrobitModel, { MICROBIT_PIN_POSITIONS } from './MicrobitModel';
import Teensy4Model, { TEENSY4_PIN_POSITIONS } from './Teensy4Model';
import ArduinoDueModel, { ARDUINO_DUE_PIN_POSITIONS } from './ArduinoDueModel';
import ArduinoMegaModel, { ARDUINO_MEGA_PIN_POSITIONS } from './ArduinoMegaModel';
import RaspberryPi4Model, { RASPBERRY_PI_4_PIN_POSITIONS } from './RaspberryPi4Model';
import RaspberryPiZeroWModel, { RASPBERRY_PI_ZERO_W_PIN_POSITIONS } from './RaspberryPiZeroWModel';
import JetsonNanoModel, { JETSON_NANO_PIN_POSITIONS } from './JetsonNanoModel';
import OrangePiModel, { ORANGE_PI_PIN_POSITIONS } from './OrangePiModel';
import BeagleBoneBlackModel, { BEAGLEBONE_BLACK_PIN_POSITIONS } from './BeagleBoneBlackModel';
import DcGearedMotorModel, { DC_GEARED_MOTOR_PIN_POSITIONS } from './DcGearedMotorModel';
import Stepper28BYJ48Model, { STEPPER_28BYJ48_PIN_POSITIONS } from './Stepper28BYJ48Model';
import Nema17StepperModel, { NEMA17_STEPPER_PIN_POSITIONS } from './Nema17StepperModel';
import Mg996rServoModel, { MG996R_SERVO_PIN_POSITIONS } from './Mg996rServoModel';
import BldcMotorModel, { BLDC_MOTOR_PIN_POSITIONS } from './BldcMotorModel';
import LinearActuatorModel, { LINEAR_ACTUATOR_PIN_POSITIONS } from './LinearActuatorModel';
import SolenoidModel, { SOLENOID_PIN_POSITIONS } from './SolenoidModel';
import L298NModel, { L298N_PIN_POSITIONS } from './L298NModel';
import L293DModel, { L293D_PIN_POSITIONS } from './L293DModel';
import TB6600Model, { TB6600_PIN_POSITIONS } from './TB6600Model';
import A4988Model, { A4988_PIN_POSITIONS } from './A4988Model';
import BTS7960Model, { BTS7960_PIN_POSITIONS } from './BTS7960Model';
import ESCModel, { ESC_PIN_POSITIONS } from './ESCModel';
import IrObstacleSensorModel, { IR_OBSTACLE_SENSOR_PIN_POSITIONS } from './IrObstacleSensorModel';
import SharpGp2y0a21Model, { SHARP_GP2Y0A21_PIN_POSITIONS } from './SharpGp2y0a21Model';
import Vl53l0xModel, { VL53L0X_PIN_POSITIONS } from './Vl53l0xModel';
import RplidarModel, { RPLIDAR_PIN_POSITIONS } from './RplidarModel';
import Mpu6050Model, { MPU6050_PIN_POSITIONS } from './Mpu6050Model';
import Mpu9250Model, { MPU9250_PIN_POSITIONS } from './Mpu9250Model';
import Adxl345Model, { ADXL345_PIN_POSITIONS } from './Adxl345Model';
import Bno055Model, { BNO055_PIN_POSITIONS } from './Bno055Model';
import Dht11Model, { DHT11_DHT22_PIN_POSITIONS } from './Dht11Model';
import Bme280Model, { BME280_PIN_POSITIONS } from './Bme280Model';
import LdrModel, { LDR_PIN_POSITIONS } from './LdrModel';
import SoilMoistureSensorModel, { SOIL_MOISTURE_SENSOR_PIN_POSITIONS } from './SoilMoistureSensorModel';
import MqGasSensorModel, { MQ_GAS_SENSOR_PIN_POSITIONS } from './MqGasSensorModel';
import FlameSensorModel, { FLAME_SENSOR_PIN_POSITIONS } from './FlameSensorModel';
import RainSensorModel, { RAIN_SENSOR_PIN_POSITIONS } from './RainSensorModel';
import Ov7670Model, { OV7670_PIN_POSITIONS } from './Ov7670Model';
import PiCameraModuleModel, { PI_CAMERA_MODULE_PIN_POSITIONS } from './PiCameraModuleModel';
import Esp32CamModel, { ESP32_CAM_PIN_POSITIONS } from './Esp32CamModel';
import UsbWebcamModel, { USB_WEBCAM_PIN_POSITIONS } from './UsbWebcamModel';
import IrLineSensorArrayModel, { IR_LINE_SENSOR_ARRAY_PIN_POSITIONS } from './IrLineSensorArrayModel';
import RotaryEncoderModel, { ROTARY_ENCODER_PIN_POSITIONS } from './RotaryEncoderModel';
import OpticalWheelEncoderModel, { OPTICAL_WHEEL_ENCODER_PIN_POSITIONS } from './OpticalWheelEncoderModel';
import HallEffectSensorModel, { HALL_EFFECT_SENSOR_PIN_POSITIONS } from './HallEffectSensorModel';
import PotentiometerModel, { POTENTIOMETER_PIN_POSITIONS } from './PotentiometerModel';
import Hc05BluetoothModel, { HC05_BLUETOOTH_PIN_POSITIONS } from './Hc05BluetoothModel';
import Nrf24l01Model, { NRF24L01_PIN_POSITIONS } from './Nrf24l01Model';
import LoraSx1278Model, { LORA_SX1278_PIN_POSITIONS } from './LoraSx1278Model';
import Hc12Model, { HC12_PIN_POSITIONS } from './Hc12Model';
import Rf433PairModel, { RF433_PAIR_PIN_POSITIONS } from './Rf433PairModel';
import Sim800lModel, { SIM800L_PIN_POSITIONS } from './Sim800lModel';
import Neo6mGpsModel, { NEO6M_GPS_PIN_POSITIONS } from './Neo6mGpsModel';
import Rc522RfidModel, { RC522_RFID_PIN_POSITIONS } from './Rc522RfidModel';
import Lcd1602Model, { LCD1602_PIN_POSITIONS } from './Lcd1602Model';
import Ssd1306OledModel, { SSD1306_OLED_PIN_POSITIONS } from './Ssd1306OledModel';
import SevenSegmentDisplayModel, { SEVEN_SEGMENT_DISPLAY_PIN_POSITIONS } from './SevenSegmentDisplayModel';
import Ws2812bModel, { WS2812B_PIN_POSITIONS } from './Ws2812bModel';
import BuzzerModel, { BUZZER_PIN_POSITIONS } from './BuzzerModel';
import StandardLedModel, { STANDARD_LED_PIN_POSITIONS } from './StandardLedModel';
import PushButtonModel, { PUSH_BUTTON_PIN_POSITIONS } from './PushButtonModel';
import TactileSwitchModel, { TACTILE_SWITCH_PIN_POSITIONS } from './TactileSwitchModel';
import MembraneKeypadModel, { MEMBRANE_KEYPAD_PIN_POSITIONS } from './MembraneKeypadModel';
import JoystickModuleModel, { JOYSTICK_MODULE_PIN_POSITIONS } from './JoystickModuleModel';
import LimitSwitchModel, { LIMIT_SWITCH_PIN_POSITIONS } from './LimitSwitchModel';
import LipoBatteryModel, { LIPO_BATTERY_PIN_POSITIONS } from './LipoBatteryModel';
import Holder18650Model, { HOLDER_18650_PIN_POSITIONS } from './Holder18650Model';
import Tp4056Model, { TP4056_PIN_POSITIONS } from './Tp4056Model';
import Lm2596Model, { LM2596_PIN_POSITIONS } from './Lm2596Model';
import BoostConverterModel, { BOOST_CONVERTER_PIN_POSITIONS } from './BoostConverterModel';
import VoltageRegulatorModel, { VOLTAGE_REGULATOR_PIN_POSITIONS } from './VoltageRegulatorModel';
import RelayModuleModel, { RELAY_MODULE_PIN_POSITIONS } from './RelayModuleModel';
import BmsBoardModel, { BMS_BOARD_PIN_POSITIONS } from './BmsBoardModel';
import RobotChassisKitModel, { ROBOT_CHASSIS_KIT_PIN_POSITIONS } from './RobotChassisKitModel';
import RobotWheelModel, { ROBOT_WHEEL_PIN_POSITIONS } from './RobotWheelModel';
import CasterWheelModel, { CASTER_WHEEL_PIN_POSITIONS } from './CasterWheelModel';
import ServoBracketArmKitModel, { SERVO_BRACKET_ARM_KIT_PIN_POSITIONS } from './ServoBracketArmKitModel';
import MecanumWheelModel, { MECANUM_WHEEL_PIN_POSITIONS } from './MecanumWheelModel';
import TimingBeltPulleyModel, { TIMING_BELT_PULLEY_PIN_POSITIONS } from './TimingBeltPulleyModel';
import BallBearingModel, { BALL_BEARING_PIN_POSITIONS } from './BallBearingModel';
import AluminumExtrusionModel, { ALUMINUM_EXTRUSION_PIN_POSITIONS } from './AluminumExtrusionModel';
import BreadboardModel, { BREADBOARD_PIN_POSITIONS } from './BreadboardModel';
import JumperWiresModel, { JUMPER_WIRES_PIN_POSITIONS } from './JumperWiresModel';
import BasicPassivesModel, { BASIC_PASSIVES_PIN_POSITIONS } from './BasicPassivesModel';
import PerfboardModel, { PERFBOARD_PIN_POSITIONS } from './PerfboardModel';
import MultimeterModel, { MULTIMETER_PIN_POSITIONS } from './MultimeterModel';

// Higher-level / professional-tier and hobbyist-gap expansion (33 new components)
import RealSenseD435iModel, { REALSENSE_D435I_PIN_POSITIONS } from './RealSenseD435iModel';
import Lidar3dModel, { LIDAR_3D_PIN_POSITIONS } from './Lidar3dModel';
import StereoCameraModel, { STEREO_CAMERA_PIN_POSITIONS } from './StereoCameraModel';
import ThermalCameraModel, { THERMAL_CAMERA_PIN_POSITIONS } from './ThermalCameraModel';
import PirMotionSensorModel, { PIR_MOTION_SENSOR_PIN_POSITIONS } from './PirMotionSensorModel';
import MagnetometerModel, { MAGNETOMETER_PIN_POSITIONS } from './MagnetometerModel';
import ForceTorqueSensorModel, { FORCE_TORQUE_SENSOR_PIN_POSITIONS } from './ForceTorqueSensorModel';
import LoadCellHx711Model, { LOAD_CELL_HX711_PIN_POSITIONS } from './LoadCellHx711Model';
import IndustrialAbsoluteEncoderModel, { INDUSTRIAL_ABSOLUTE_ENCODER_PIN_POSITIONS } from './IndustrialAbsoluteEncoderModel';
import CanBusModuleModel, { CAN_BUS_MODULE_PIN_POSITIONS } from './CanBusModuleModel';
import Rs485ModbusModuleModel, { RS485_MODBUS_MODULE_PIN_POSITIONS } from './Rs485ModbusModuleModel';
import XbeeModuleModel, { XBEE_MODULE_PIN_POSITIONS } from './XbeeModuleModel';
import FocBldcServoDriverModel, { FOC_BLDC_SERVO_DRIVER_PIN_POSITIONS } from './FocBldcServoDriverModel';
import IndustrialServoDriveModel, { INDUSTRIAL_SERVO_DRIVE_PIN_POSITIONS } from './IndustrialServoDriveModel';
import BallScrewActuatorModel, { BALL_SCREW_ACTUATOR_PIN_POSITIONS } from './BallScrewActuatorModel';
import PneumaticCylinderModel, { PNEUMATIC_CYLINDER_PIN_POSITIONS } from './PneumaticCylinderModel';
import VibrationMotorModel, { VIBRATION_MOTOR_PIN_POSITIONS } from './VibrationMotorModel';
import HarmonicDriveGearboxModel, { HARMONIC_DRIVE_GEARBOX_PIN_POSITIONS } from './HarmonicDriveGearboxModel';
import RoboticGripperModel, { ROBOTIC_GRIPPER_PIN_POSITIONS } from './RoboticGripperModel';
import RoboticArm6DofModel, { ROBOTIC_ARM_6DOF_PIN_POSITIONS } from './RoboticArm6DofModel';
import SlewingRingBearingModel, { SLEWING_RING_BEARING_PIN_POSITIONS } from './SlewingRingBearingModel';
import JetsonOrinNanoModel, { JETSON_ORIN_NANO_PIN_POSITIONS } from './JetsonOrinNanoModel';
import IndustrialPlcModel, { INDUSTRIAL_PLC_PIN_POSITIONS } from './IndustrialPlcModel';
import RaspberryPi5Model, { RASPBERRY_PI_5_PIN_POSITIONS } from './RaspberryPi5Model';
import ColorSensorModel, { COLOR_SENSOR_PIN_POSITIONS } from './ColorSensorModel';
import UvSensorModel, { UV_SENSOR_PIN_POSITIONS } from './UvSensorModel';
import Co2SensorModel, { CO2_SENSOR_PIN_POSITIONS } from './Co2SensorModel';
import PhSensorModel, { PH_SENSOR_PIN_POSITIONS } from './PhSensorModel';
import TftColorLcdModel, { TFT_COLOR_LCD_PIN_POSITIONS } from './TftColorLcdModel';
import Tm1637DisplayModel, { TM1637_DISPLAY_PIN_POSITIONS } from './Tm1637DisplayModel';
import Max7219DotMatrixModel, { MAX7219_DOT_MATRIX_PIN_POSITIONS } from './Max7219DotMatrixModel';
import SolarPanelModel, { SOLAR_PANEL_PIN_POSITIONS } from './SolarPanelModel';
import CapacitiveTouchSensorModel, { CAPACITIVE_TOUCH_SENSOR_PIN_POSITIONS } from './CapacitiveTouchSensorModel';

export interface ModelRegistryEntry {
  Model: ComponentType;
  pinPositions: Record<string, [number, number, number]>;
  cameraDistance: number;
}

export const MODEL_REGISTRY: Record<string, ModelRegistryEntry> = {
  'arduino-uno-r3': { Model: ArduinoUnoModel, pinPositions: ARDUINO_PIN_POSITIONS, cameraDistance: 3.6 },
  'hc-sr04': { Model: HcSr04Model, pinPositions: HC_SR04_PIN_POSITIONS, cameraDistance: 2.4 },
  'sg90-servo': { Model: ServoModel, pinPositions: SERVO_PIN_POSITIONS, cameraDistance: 2.2 },
  'arduino-nano': { Model: ArduinoNanoModel, pinPositions: ARDUINO_NANO_PIN_POSITIONS, cameraDistance: 2.8 },
  'arduino-pro-mini': { Model: ArduinoProMiniModel, pinPositions: ARDUINO_PRO_MINI_PIN_POSITIONS, cameraDistance: 2.0 },
  'arduino-leonardo': { Model: ArduinoLeonardoModel, pinPositions: ARDUINO_LEONARDO_PIN_POSITIONS, cameraDistance: 3.6 },
  'arduino-micro': { Model: ArduinoMicroModel, pinPositions: ARDUINO_MICRO_PIN_POSITIONS, cameraDistance: 2.6 },
  attiny85: { Model: ATtiny85Model, pinPositions: ATTINY85_PIN_POSITIONS, cameraDistance: 1.4 },
  'esp32-devkit': { Model: ESP32Model, pinPositions: ESP32_PIN_POSITIONS, cameraDistance: 3.4 },
  'esp8266-nodemcu': { Model: ESP8266Model, pinPositions: ESP8266_PIN_POSITIONS, cameraDistance: 3.0 },
  'raspberry-pi-pico': { Model: RaspberryPiPicoModel, pinPositions: RASPBERRY_PI_PICO_PIN_POSITIONS, cameraDistance: 2.6 },
  'stm32-blue-pill': { Model: STM32BluePillModel, pinPositions: STM32_BLUE_PILL_PIN_POSITIONS, cameraDistance: 3.2 },
  microbit: { Model: MicrobitModel, pinPositions: MICROBIT_PIN_POSITIONS, cameraDistance: 2.6 },
  'teensy-4': { Model: Teensy4Model, pinPositions: TEENSY4_PIN_POSITIONS, cameraDistance: 2.4 },
  'arduino-due': { Model: ArduinoDueModel, pinPositions: ARDUINO_DUE_PIN_POSITIONS, cameraDistance: 5.0 },
  'arduino-mega-2560': { Model: ArduinoMegaModel, pinPositions: ARDUINO_MEGA_PIN_POSITIONS, cameraDistance: 5.0 },
  'raspberry-pi-4': { Model: RaspberryPi4Model, pinPositions: RASPBERRY_PI_4_PIN_POSITIONS, cameraDistance: 3.6 },
  'raspberry-pi-zero-w': { Model: RaspberryPiZeroWModel, pinPositions: RASPBERRY_PI_ZERO_W_PIN_POSITIONS, cameraDistance: 2.0 },
  'jetson-nano': { Model: JetsonNanoModel, pinPositions: JETSON_NANO_PIN_POSITIONS, cameraDistance: 4.0 },
  'orange-pi': { Model: OrangePiModel, pinPositions: ORANGE_PI_PIN_POSITIONS, cameraDistance: 3.4 },
  'beaglebone-black': { Model: BeagleBoneBlackModel, pinPositions: BEAGLEBONE_BLACK_PIN_POSITIONS, cameraDistance: 3.6 },
  'dc-geared-motor': { Model: DcGearedMotorModel, pinPositions: DC_GEARED_MOTOR_PIN_POSITIONS, cameraDistance: 1.8 },
  '28byj48-stepper': { Model: Stepper28BYJ48Model, pinPositions: STEPPER_28BYJ48_PIN_POSITIONS, cameraDistance: 2.2 },
  'nema17-stepper': { Model: Nema17StepperModel, pinPositions: NEMA17_STEPPER_PIN_POSITIONS, cameraDistance: 2.0 },
  'mg996r-servo': { Model: Mg996rServoModel, pinPositions: MG996R_SERVO_PIN_POSITIONS, cameraDistance: 2.2 },
  'continuous-rotation-servo': { Model: ServoModel, pinPositions: SERVO_PIN_POSITIONS, cameraDistance: 2.2 },
  'bldc-motor': { Model: BldcMotorModel, pinPositions: BLDC_MOTOR_PIN_POSITIONS, cameraDistance: 1.8 },
  'linear-actuator': { Model: LinearActuatorModel, pinPositions: LINEAR_ACTUATOR_PIN_POSITIONS, cameraDistance: 2.4 },
  solenoid: { Model: SolenoidModel, pinPositions: SOLENOID_PIN_POSITIONS, cameraDistance: 1.6 },
  l298n: { Model: L298NModel, pinPositions: L298N_PIN_POSITIONS, cameraDistance: 2.6 },
  l293d: { Model: L293DModel, pinPositions: L293D_PIN_POSITIONS, cameraDistance: 1.6 },
  tb6600: { Model: TB6600Model, pinPositions: TB6600_PIN_POSITIONS, cameraDistance: 2.2 },
  'a4988-drv8825': { Model: A4988Model, pinPositions: A4988_PIN_POSITIONS, cameraDistance: 1.4 },
  bts7960: { Model: BTS7960Model, pinPositions: BTS7960_PIN_POSITIONS, cameraDistance: 2.0 },
  esc: { Model: ESCModel, pinPositions: ESC_PIN_POSITIONS, cameraDistance: 2.2 },
  'ir-obstacle-sensor': { Model: IrObstacleSensorModel, pinPositions: IR_OBSTACLE_SENSOR_PIN_POSITIONS, cameraDistance: 1.6 },
  'sharp-gp2y0a21': { Model: SharpGp2y0a21Model, pinPositions: SHARP_GP2Y0A21_PIN_POSITIONS, cameraDistance: 1.6 },
  vl53l0x: { Model: Vl53l0xModel, pinPositions: VL53L0X_PIN_POSITIONS, cameraDistance: 1.2 },
  rplidar: { Model: RplidarModel, pinPositions: RPLIDAR_PIN_POSITIONS, cameraDistance: 2.0 },
  mpu6050: { Model: Mpu6050Model, pinPositions: MPU6050_PIN_POSITIONS, cameraDistance: 1.3 },
  mpu9250: { Model: Mpu9250Model, pinPositions: MPU9250_PIN_POSITIONS, cameraDistance: 1.3 },
  adxl345: { Model: Adxl345Model, pinPositions: ADXL345_PIN_POSITIONS, cameraDistance: 1.2 },
  bno055: { Model: Bno055Model, pinPositions: BNO055_PIN_POSITIONS, cameraDistance: 1.4 },
  'dht11-dht22': { Model: Dht11Model, pinPositions: DHT11_DHT22_PIN_POSITIONS, cameraDistance: 1.4 },
  bme280: { Model: Bme280Model, pinPositions: BME280_PIN_POSITIONS, cameraDistance: 1.1 },
  ldr: { Model: LdrModel, pinPositions: LDR_PIN_POSITIONS, cameraDistance: 1.0 },
  'soil-moisture-sensor': { Model: SoilMoistureSensorModel, pinPositions: SOIL_MOISTURE_SENSOR_PIN_POSITIONS, cameraDistance: 2.0 },
  'mq-gas-sensor': { Model: MqGasSensorModel, pinPositions: MQ_GAS_SENSOR_PIN_POSITIONS, cameraDistance: 1.5 },
  'flame-sensor': { Model: FlameSensorModel, pinPositions: FLAME_SENSOR_PIN_POSITIONS, cameraDistance: 1.6 },
  'rain-sensor': { Model: RainSensorModel, pinPositions: RAIN_SENSOR_PIN_POSITIONS, cameraDistance: 2.0 },
  ov7670: { Model: Ov7670Model, pinPositions: OV7670_PIN_POSITIONS, cameraDistance: 1.4 },
  'pi-camera-module': { Model: PiCameraModuleModel, pinPositions: PI_CAMERA_MODULE_PIN_POSITIONS, cameraDistance: 1.3 },
  'esp32-cam': { Model: Esp32CamModel, pinPositions: ESP32_CAM_PIN_POSITIONS, cameraDistance: 1.6 },
  'usb-webcam': { Model: UsbWebcamModel, pinPositions: USB_WEBCAM_PIN_POSITIONS, cameraDistance: 1.2 },
  'ir-line-sensor-array': { Model: IrLineSensorArrayModel, pinPositions: IR_LINE_SENSOR_ARRAY_PIN_POSITIONS, cameraDistance: 1.8 },
  'rotary-encoder': { Model: RotaryEncoderModel, pinPositions: ROTARY_ENCODER_PIN_POSITIONS, cameraDistance: 1.2 },
  'optical-wheel-encoder': { Model: OpticalWheelEncoderModel, pinPositions: OPTICAL_WHEEL_ENCODER_PIN_POSITIONS, cameraDistance: 1.6 },
  'hall-effect-sensor': { Model: HallEffectSensorModel, pinPositions: HALL_EFFECT_SENSOR_PIN_POSITIONS, cameraDistance: 1.0 },
  potentiometer: { Model: PotentiometerModel, pinPositions: POTENTIOMETER_PIN_POSITIONS, cameraDistance: 1.1 },
  'hc05-bluetooth': { Model: Hc05BluetoothModel, pinPositions: HC05_BLUETOOTH_PIN_POSITIONS, cameraDistance: 1.4 },
  nrf24l01: { Model: Nrf24l01Model, pinPositions: NRF24L01_PIN_POSITIONS, cameraDistance: 1.4 },
  'lora-sx1278': { Model: LoraSx1278Model, pinPositions: LORA_SX1278_PIN_POSITIONS, cameraDistance: 1.4 },
  hc12: { Model: Hc12Model, pinPositions: HC12_PIN_POSITIONS, cameraDistance: 1.2 },
  'rf433-pair': { Model: Rf433PairModel, pinPositions: RF433_PAIR_PIN_POSITIONS, cameraDistance: 1.8 },
  sim800l: { Model: Sim800lModel, pinPositions: SIM800L_PIN_POSITIONS, cameraDistance: 1.4 },
  'neo6m-gps': { Model: Neo6mGpsModel, pinPositions: NEO6M_GPS_PIN_POSITIONS, cameraDistance: 1.4 },
  'rc522-rfid': { Model: Rc522RfidModel, pinPositions: RC522_RFID_PIN_POSITIONS, cameraDistance: 1.4 },
  lcd1602: { Model: Lcd1602Model, pinPositions: LCD1602_PIN_POSITIONS, cameraDistance: 2.0 },
  'ssd1306-oled': { Model: Ssd1306OledModel, pinPositions: SSD1306_OLED_PIN_POSITIONS, cameraDistance: 1.2 },
  'seven-segment-display': { Model: SevenSegmentDisplayModel, pinPositions: SEVEN_SEGMENT_DISPLAY_PIN_POSITIONS, cameraDistance: 1.4 },
  'ws2812b-neopixel': { Model: Ws2812bModel, pinPositions: WS2812B_PIN_POSITIONS, cameraDistance: 0.8 },
  buzzer: { Model: BuzzerModel, pinPositions: BUZZER_PIN_POSITIONS, cameraDistance: 1.0 },
  'standard-led': { Model: StandardLedModel, pinPositions: STANDARD_LED_PIN_POSITIONS, cameraDistance: 0.8 },
  'push-button': { Model: PushButtonModel, pinPositions: PUSH_BUTTON_PIN_POSITIONS, cameraDistance: 1.9 },
  'tactile-switch': { Model: TactileSwitchModel, pinPositions: TACTILE_SWITCH_PIN_POSITIONS, cameraDistance: 0.8 },
  'membrane-keypad': { Model: MembraneKeypadModel, pinPositions: MEMBRANE_KEYPAD_PIN_POSITIONS, cameraDistance: 2.2 },
  'joystick-module': { Model: JoystickModuleModel, pinPositions: JOYSTICK_MODULE_PIN_POSITIONS, cameraDistance: 1.3 },
  'limit-switch': { Model: LimitSwitchModel, pinPositions: LIMIT_SWITCH_PIN_POSITIONS, cameraDistance: 1.2 },
  'lipo-battery': { Model: LipoBatteryModel, pinPositions: LIPO_BATTERY_PIN_POSITIONS, cameraDistance: 1.6 },
  '18650-holder': { Model: Holder18650Model, pinPositions: HOLDER_18650_PIN_POSITIONS, cameraDistance: 1.8 },
  tp4056: { Model: Tp4056Model, pinPositions: TP4056_PIN_POSITIONS, cameraDistance: 1.4 },
  'lm2596-buck-converter': { Model: Lm2596Model, pinPositions: LM2596_PIN_POSITIONS, cameraDistance: 2.0 },
  'boost-converter': { Model: BoostConverterModel, pinPositions: BOOST_CONVERTER_PIN_POSITIONS, cameraDistance: 1.4 },
  'voltage-regulator': { Model: VoltageRegulatorModel, pinPositions: VOLTAGE_REGULATOR_PIN_POSITIONS, cameraDistance: 1.2 },
  'relay-module': { Model: RelayModuleModel, pinPositions: RELAY_MODULE_PIN_POSITIONS, cameraDistance: 1.8 },
  'bms-board': { Model: BmsBoardModel, pinPositions: BMS_BOARD_PIN_POSITIONS, cameraDistance: 1.4 },
  'robot-chassis-kit': { Model: RobotChassisKitModel, pinPositions: ROBOT_CHASSIS_KIT_PIN_POSITIONS, cameraDistance: 2.4 },
  'robot-wheel': { Model: RobotWheelModel, pinPositions: ROBOT_WHEEL_PIN_POSITIONS, cameraDistance: 1.4 },
  'caster-wheel': { Model: CasterWheelModel, pinPositions: CASTER_WHEEL_PIN_POSITIONS, cameraDistance: 1.2 },
  'servo-bracket-arm-kit': { Model: ServoBracketArmKitModel, pinPositions: SERVO_BRACKET_ARM_KIT_PIN_POSITIONS, cameraDistance: 1.6 },
  'mecanum-wheel': { Model: MecanumWheelModel, pinPositions: MECANUM_WHEEL_PIN_POSITIONS, cameraDistance: 1.4 },
  'timing-belt-pulley': { Model: TimingBeltPulleyModel, pinPositions: TIMING_BELT_PULLEY_PIN_POSITIONS, cameraDistance: 1.8 },
  'ball-bearing': { Model: BallBearingModel, pinPositions: BALL_BEARING_PIN_POSITIONS, cameraDistance: 1.2 },
  'aluminum-extrusion': { Model: AluminumExtrusionModel, pinPositions: ALUMINUM_EXTRUSION_PIN_POSITIONS, cameraDistance: 2.0 },
  breadboard: { Model: BreadboardModel, pinPositions: BREADBOARD_PIN_POSITIONS, cameraDistance: 2.4 },
  'jumper-wires': { Model: JumperWiresModel, pinPositions: JUMPER_WIRES_PIN_POSITIONS, cameraDistance: 1.6 },
  'basic-passives': { Model: BasicPassivesModel, pinPositions: BASIC_PASSIVES_PIN_POSITIONS, cameraDistance: 2.2 },
  perfboard: { Model: PerfboardModel, pinPositions: PERFBOARD_PIN_POSITIONS, cameraDistance: 2.0 },
  multimeter: { Model: MultimeterModel, pinPositions: MULTIMETER_PIN_POSITIONS, cameraDistance: 1.8 },

  // Higher-level / professional-tier and hobbyist-gap expansion (33 new components)
  'realsense-d435i': { Model: RealSenseD435iModel, pinPositions: REALSENSE_D435I_PIN_POSITIONS, cameraDistance: 1.9 },
  'lidar-3d': { Model: Lidar3dModel, pinPositions: LIDAR_3D_PIN_POSITIONS, cameraDistance: 2.2 },
  'stereo-camera': { Model: StereoCameraModel, pinPositions: STEREO_CAMERA_PIN_POSITIONS, cameraDistance: 1.8 },
  'thermal-camera-mlx90640': { Model: ThermalCameraModel, pinPositions: THERMAL_CAMERA_PIN_POSITIONS, cameraDistance: 1.6 },
  'pir-motion-sensor': { Model: PirMotionSensorModel, pinPositions: PIR_MOTION_SENSOR_PIN_POSITIONS, cameraDistance: 1.5 },
  'magnetometer-qmc5883l': { Model: MagnetometerModel, pinPositions: MAGNETOMETER_PIN_POSITIONS, cameraDistance: 1.0 },
  'force-torque-sensor': { Model: ForceTorqueSensorModel, pinPositions: FORCE_TORQUE_SENSOR_PIN_POSITIONS, cameraDistance: 1.8 },
  'load-cell-hx711': { Model: LoadCellHx711Model, pinPositions: LOAD_CELL_HX711_PIN_POSITIONS, cameraDistance: 1.9 },
  'industrial-absolute-encoder': { Model: IndustrialAbsoluteEncoderModel, pinPositions: INDUSTRIAL_ABSOLUTE_ENCODER_PIN_POSITIONS, cameraDistance: 1.6 },
  'can-bus-module': { Model: CanBusModuleModel, pinPositions: CAN_BUS_MODULE_PIN_POSITIONS, cameraDistance: 1.5 },
  'rs485-modbus-module': { Model: Rs485ModbusModuleModel, pinPositions: RS485_MODBUS_MODULE_PIN_POSITIONS, cameraDistance: 1.3 },
  'xbee-zigbee-module': { Model: XbeeModuleModel, pinPositions: XBEE_MODULE_PIN_POSITIONS, cameraDistance: 1.2 },
  'foc-bldc-servo-driver': { Model: FocBldcServoDriverModel, pinPositions: FOC_BLDC_SERVO_DRIVER_PIN_POSITIONS, cameraDistance: 2.2 },
  'industrial-servo-drive': { Model: IndustrialServoDriveModel, pinPositions: INDUSTRIAL_SERVO_DRIVE_PIN_POSITIONS, cameraDistance: 2.8 },
  'ball-screw-actuator': { Model: BallScrewActuatorModel, pinPositions: BALL_SCREW_ACTUATOR_PIN_POSITIONS, cameraDistance: 2.6 },
  'pneumatic-cylinder': { Model: PneumaticCylinderModel, pinPositions: PNEUMATIC_CYLINDER_PIN_POSITIONS, cameraDistance: 2.4 },
  'vibration-motor': { Model: VibrationMotorModel, pinPositions: VIBRATION_MOTOR_PIN_POSITIONS, cameraDistance: 0.8 },
  'harmonic-drive-gearbox': { Model: HarmonicDriveGearboxModel, pinPositions: HARMONIC_DRIVE_GEARBOX_PIN_POSITIONS, cameraDistance: 1.8 },
  'robotic-gripper': { Model: RoboticGripperModel, pinPositions: ROBOTIC_GRIPPER_PIN_POSITIONS, cameraDistance: 1.7 },
  'robotic-arm-6dof': { Model: RoboticArm6DofModel, pinPositions: ROBOTIC_ARM_6DOF_PIN_POSITIONS, cameraDistance: 4.0 },
  'slewing-ring-bearing': { Model: SlewingRingBearingModel, pinPositions: SLEWING_RING_BEARING_PIN_POSITIONS, cameraDistance: 1.9 },
  'jetson-orin-nano': { Model: JetsonOrinNanoModel, pinPositions: JETSON_ORIN_NANO_PIN_POSITIONS, cameraDistance: 3.4 },
  'industrial-plc': { Model: IndustrialPlcModel, pinPositions: INDUSTRIAL_PLC_PIN_POSITIONS, cameraDistance: 3.2 },
  'raspberry-pi-5': { Model: RaspberryPi5Model, pinPositions: RASPBERRY_PI_5_PIN_POSITIONS, cameraDistance: 3.7 },
  'color-sensor-tcs34725': { Model: ColorSensorModel, pinPositions: COLOR_SENSOR_PIN_POSITIONS, cameraDistance: 1.1 },
  'uv-sensor': { Model: UvSensorModel, pinPositions: UV_SENSOR_PIN_POSITIONS, cameraDistance: 1.1 },
  'co2-air-quality-sensor': { Model: Co2SensorModel, pinPositions: CO2_SENSOR_PIN_POSITIONS, cameraDistance: 1.4 },
  'ph-sensor': { Model: PhSensorModel, pinPositions: PH_SENSOR_PIN_POSITIONS, cameraDistance: 1.6 },
  'tft-color-lcd': { Model: TftColorLcdModel, pinPositions: TFT_COLOR_LCD_PIN_POSITIONS, cameraDistance: 2.2 },
  'tm1637-7segment': { Model: Tm1637DisplayModel, pinPositions: TM1637_DISPLAY_PIN_POSITIONS, cameraDistance: 1.6 },
  'max7219-dot-matrix': { Model: Max7219DotMatrixModel, pinPositions: MAX7219_DOT_MATRIX_PIN_POSITIONS, cameraDistance: 1.7 },
  'solar-panel-charge-controller': { Model: SolarPanelModel, pinPositions: SOLAR_PANEL_PIN_POSITIONS, cameraDistance: 2.4 },
  'capacitive-touch-sensor': { Model: CapacitiveTouchSensorModel, pinPositions: CAPACITIVE_TOUCH_SENSOR_PIN_POSITIONS, cameraDistance: 0.9 },
};
