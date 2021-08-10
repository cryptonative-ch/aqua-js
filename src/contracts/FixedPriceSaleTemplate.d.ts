/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface FixedPriceSaleTemplateInterface extends ethers.utils.Interface {
  functions: {
    "aquaFactory()": FunctionFragment;
    "createSale()": FunctionFragment;
    "encodedInitData()": FunctionFragment;
    "init(bytes)": FunctionFragment;
    "isInitialized()": FunctionFragment;
    "isSaleCreated()": FunctionFragment;
    "metaDataContentHash()": FunctionFragment;
    "saleLauncher()": FunctionFragment;
    "saleTemplateId()": FunctionFragment;
    "templateLauncher()": FunctionFragment;
    "templateManager()": FunctionFragment;
    "templateName()": FunctionFragment;
    "tokenOut()": FunctionFragment;
    "tokenSupplier()": FunctionFragment;
    "tokensForSale()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "aquaFactory",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createSale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "encodedInitData",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "init", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isSaleCreated",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "metaDataContentHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "saleLauncher",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "saleTemplateId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "templateLauncher",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "templateManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "templateName",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "tokenOut", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenSupplier",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokensForSale",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "aquaFactory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createSale", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "encodedInitData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSaleCreated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "metaDataContentHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "saleLauncher",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "saleTemplateId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "templateLauncher",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "templateManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "templateName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenOut", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenSupplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokensForSale",
    data: BytesLike
  ): Result;

  events: {
    "TemplateInitialized(address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TemplateInitialized"): EventFragment;
}

export class FixedPriceSaleTemplate extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: FixedPriceSaleTemplateInterface;

  functions: {
    aquaFactory(overrides?: CallOverrides): Promise<[string]>;

    "aquaFactory()"(overrides?: CallOverrides): Promise<[string]>;

    createSale(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "createSale()"(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    encodedInitData(overrides?: CallOverrides): Promise<[string]>;

    "encodedInitData()"(overrides?: CallOverrides): Promise<[string]>;

    init(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "init(bytes)"(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isInitialized(overrides?: CallOverrides): Promise<[boolean]>;

    "isInitialized()"(overrides?: CallOverrides): Promise<[boolean]>;

    isSaleCreated(overrides?: CallOverrides): Promise<[boolean]>;

    "isSaleCreated()"(overrides?: CallOverrides): Promise<[boolean]>;

    metaDataContentHash(overrides?: CallOverrides): Promise<[string]>;

    "metaDataContentHash()"(overrides?: CallOverrides): Promise<[string]>;

    saleLauncher(overrides?: CallOverrides): Promise<[string]>;

    "saleLauncher()"(overrides?: CallOverrides): Promise<[string]>;

    saleTemplateId(overrides?: CallOverrides): Promise<[BigNumber]>;

    "saleTemplateId()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    templateLauncher(overrides?: CallOverrides): Promise<[string]>;

    "templateLauncher()"(overrides?: CallOverrides): Promise<[string]>;

    templateManager(overrides?: CallOverrides): Promise<[string]>;

    "templateManager()"(overrides?: CallOverrides): Promise<[string]>;

    templateName(overrides?: CallOverrides): Promise<[string]>;

    "templateName()"(overrides?: CallOverrides): Promise<[string]>;

    tokenOut(overrides?: CallOverrides): Promise<[string]>;

    "tokenOut()"(overrides?: CallOverrides): Promise<[string]>;

    tokenSupplier(overrides?: CallOverrides): Promise<[string]>;

    "tokenSupplier()"(overrides?: CallOverrides): Promise<[string]>;

    tokensForSale(overrides?: CallOverrides): Promise<[BigNumber]>;

    "tokensForSale()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  aquaFactory(overrides?: CallOverrides): Promise<string>;

  "aquaFactory()"(overrides?: CallOverrides): Promise<string>;

  createSale(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "createSale()"(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  encodedInitData(overrides?: CallOverrides): Promise<string>;

  "encodedInitData()"(overrides?: CallOverrides): Promise<string>;

  init(
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "init(bytes)"(
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isInitialized(overrides?: CallOverrides): Promise<boolean>;

  "isInitialized()"(overrides?: CallOverrides): Promise<boolean>;

  isSaleCreated(overrides?: CallOverrides): Promise<boolean>;

  "isSaleCreated()"(overrides?: CallOverrides): Promise<boolean>;

  metaDataContentHash(overrides?: CallOverrides): Promise<string>;

  "metaDataContentHash()"(overrides?: CallOverrides): Promise<string>;

  saleLauncher(overrides?: CallOverrides): Promise<string>;

  "saleLauncher()"(overrides?: CallOverrides): Promise<string>;

  saleTemplateId(overrides?: CallOverrides): Promise<BigNumber>;

  "saleTemplateId()"(overrides?: CallOverrides): Promise<BigNumber>;

  templateLauncher(overrides?: CallOverrides): Promise<string>;

  "templateLauncher()"(overrides?: CallOverrides): Promise<string>;

  templateManager(overrides?: CallOverrides): Promise<string>;

  "templateManager()"(overrides?: CallOverrides): Promise<string>;

  templateName(overrides?: CallOverrides): Promise<string>;

  "templateName()"(overrides?: CallOverrides): Promise<string>;

  tokenOut(overrides?: CallOverrides): Promise<string>;

  "tokenOut()"(overrides?: CallOverrides): Promise<string>;

  tokenSupplier(overrides?: CallOverrides): Promise<string>;

  "tokenSupplier()"(overrides?: CallOverrides): Promise<string>;

  tokensForSale(overrides?: CallOverrides): Promise<BigNumber>;

  "tokensForSale()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    aquaFactory(overrides?: CallOverrides): Promise<string>;

    "aquaFactory()"(overrides?: CallOverrides): Promise<string>;

    createSale(overrides?: CallOverrides): Promise<string>;

    "createSale()"(overrides?: CallOverrides): Promise<string>;

    encodedInitData(overrides?: CallOverrides): Promise<string>;

    "encodedInitData()"(overrides?: CallOverrides): Promise<string>;

    init(_data: BytesLike, overrides?: CallOverrides): Promise<void>;

    "init(bytes)"(_data: BytesLike, overrides?: CallOverrides): Promise<void>;

    isInitialized(overrides?: CallOverrides): Promise<boolean>;

    "isInitialized()"(overrides?: CallOverrides): Promise<boolean>;

    isSaleCreated(overrides?: CallOverrides): Promise<boolean>;

    "isSaleCreated()"(overrides?: CallOverrides): Promise<boolean>;

    metaDataContentHash(overrides?: CallOverrides): Promise<string>;

    "metaDataContentHash()"(overrides?: CallOverrides): Promise<string>;

    saleLauncher(overrides?: CallOverrides): Promise<string>;

    "saleLauncher()"(overrides?: CallOverrides): Promise<string>;

    saleTemplateId(overrides?: CallOverrides): Promise<BigNumber>;

    "saleTemplateId()"(overrides?: CallOverrides): Promise<BigNumber>;

    templateLauncher(overrides?: CallOverrides): Promise<string>;

    "templateLauncher()"(overrides?: CallOverrides): Promise<string>;

    templateManager(overrides?: CallOverrides): Promise<string>;

    "templateManager()"(overrides?: CallOverrides): Promise<string>;

    templateName(overrides?: CallOverrides): Promise<string>;

    "templateName()"(overrides?: CallOverrides): Promise<string>;

    tokenOut(overrides?: CallOverrides): Promise<string>;

    "tokenOut()"(overrides?: CallOverrides): Promise<string>;

    tokenSupplier(overrides?: CallOverrides): Promise<string>;

    "tokenSupplier()"(overrides?: CallOverrides): Promise<string>;

    tokensForSale(overrides?: CallOverrides): Promise<BigNumber>;

    "tokensForSale()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    TemplateInitialized(
      tokenIn: null,
      tokenOut: null,
      tokenPrice: null,
      tokensForSale: null,
      startDate: null,
      endDate: null,
      minCommitment: null,
      maxCommitment: null,
      minRaise: null,
      participantList: null
    ): TypedEventFilter<
      [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ],
      {
        tokenIn: string;
        tokenOut: string;
        tokenPrice: BigNumber;
        tokensForSale: BigNumber;
        startDate: BigNumber;
        endDate: BigNumber;
        minCommitment: BigNumber;
        maxCommitment: BigNumber;
        minRaise: BigNumber;
        participantList: boolean;
      }
    >;
  };

  estimateGas: {
    aquaFactory(overrides?: CallOverrides): Promise<BigNumber>;

    "aquaFactory()"(overrides?: CallOverrides): Promise<BigNumber>;

    createSale(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "createSale()"(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    encodedInitData(overrides?: CallOverrides): Promise<BigNumber>;

    "encodedInitData()"(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "init(bytes)"(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isInitialized(overrides?: CallOverrides): Promise<BigNumber>;

    "isInitialized()"(overrides?: CallOverrides): Promise<BigNumber>;

    isSaleCreated(overrides?: CallOverrides): Promise<BigNumber>;

    "isSaleCreated()"(overrides?: CallOverrides): Promise<BigNumber>;

    metaDataContentHash(overrides?: CallOverrides): Promise<BigNumber>;

    "metaDataContentHash()"(overrides?: CallOverrides): Promise<BigNumber>;

    saleLauncher(overrides?: CallOverrides): Promise<BigNumber>;

    "saleLauncher()"(overrides?: CallOverrides): Promise<BigNumber>;

    saleTemplateId(overrides?: CallOverrides): Promise<BigNumber>;

    "saleTemplateId()"(overrides?: CallOverrides): Promise<BigNumber>;

    templateLauncher(overrides?: CallOverrides): Promise<BigNumber>;

    "templateLauncher()"(overrides?: CallOverrides): Promise<BigNumber>;

    templateManager(overrides?: CallOverrides): Promise<BigNumber>;

    "templateManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    templateName(overrides?: CallOverrides): Promise<BigNumber>;

    "templateName()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenOut(overrides?: CallOverrides): Promise<BigNumber>;

    "tokenOut()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenSupplier(overrides?: CallOverrides): Promise<BigNumber>;

    "tokenSupplier()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokensForSale(overrides?: CallOverrides): Promise<BigNumber>;

    "tokensForSale()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    aquaFactory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "aquaFactory()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createSale(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "createSale()"(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    encodedInitData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "encodedInitData()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    init(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "init(bytes)"(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isInitialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "isInitialized()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isSaleCreated(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "isSaleCreated()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    metaDataContentHash(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "metaDataContentHash()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    saleLauncher(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "saleLauncher()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    saleTemplateId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "saleTemplateId()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    templateLauncher(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "templateLauncher()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    templateManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "templateManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    templateName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "templateName()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenOut(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tokenOut()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenSupplier(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tokenSupplier()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokensForSale(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tokensForSale()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
