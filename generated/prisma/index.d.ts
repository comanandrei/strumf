
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Household
 * 
 */
export type Household = $Result.DefaultSelection<Prisma.$HouseholdPayload>
/**
 * Model HouseholdMembership
 * 
 */
export type HouseholdMembership = $Result.DefaultSelection<Prisma.$HouseholdMembershipPayload>
/**
 * Model CaregiverInvite
 * 
 */
export type CaregiverInvite = $Result.DefaultSelection<Prisma.$CaregiverInvitePayload>
/**
 * Model Baby
 * 
 */
export type Baby = $Result.DefaultSelection<Prisma.$BabyPayload>
/**
 * Model FeedingEvent
 * 
 */
export type FeedingEvent = $Result.DefaultSelection<Prisma.$FeedingEventPayload>
/**
 * Model Consultation
 * 
 */
export type Consultation = $Result.DefaultSelection<Prisma.$ConsultationPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model PredictionCache
 * 
 */
export type PredictionCache = $Result.DefaultSelection<Prisma.$PredictionCachePayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const HouseholdRole: {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER'
};

export type HouseholdRole = (typeof HouseholdRole)[keyof typeof HouseholdRole]


export const MilkType: {
  BREAST_MILK: 'BREAST_MILK',
  FORMULA: 'FORMULA',
  MIXED: 'MIXED',
  UNKNOWN: 'UNKNOWN'
};

export type MilkType = (typeof MilkType)[keyof typeof MilkType]


export const BabySex: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  UNKNOWN: 'UNKNOWN'
};

export type BabySex = (typeof BabySex)[keyof typeof BabySex]

}

export type HouseholdRole = $Enums.HouseholdRole

export const HouseholdRole: typeof $Enums.HouseholdRole

export type MilkType = $Enums.MilkType

export const MilkType: typeof $Enums.MilkType

export type BabySex = $Enums.BabySex

export const BabySex: typeof $Enums.BabySex

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Households
 * const households = await prisma.household.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Households
   * const households = await prisma.household.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.household`: Exposes CRUD operations for the **Household** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Households
    * const households = await prisma.household.findMany()
    * ```
    */
  get household(): Prisma.HouseholdDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.householdMembership`: Exposes CRUD operations for the **HouseholdMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HouseholdMemberships
    * const householdMemberships = await prisma.householdMembership.findMany()
    * ```
    */
  get householdMembership(): Prisma.HouseholdMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caregiverInvite`: Exposes CRUD operations for the **CaregiverInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaregiverInvites
    * const caregiverInvites = await prisma.caregiverInvite.findMany()
    * ```
    */
  get caregiverInvite(): Prisma.CaregiverInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.baby`: Exposes CRUD operations for the **Baby** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Babies
    * const babies = await prisma.baby.findMany()
    * ```
    */
  get baby(): Prisma.BabyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedingEvent`: Exposes CRUD operations for the **FeedingEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedingEvents
    * const feedingEvents = await prisma.feedingEvent.findMany()
    * ```
    */
  get feedingEvent(): Prisma.FeedingEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultation`: Exposes CRUD operations for the **Consultation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultations
    * const consultations = await prisma.consultation.findMany()
    * ```
    */
  get consultation(): Prisma.ConsultationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.predictionCache`: Exposes CRUD operations for the **PredictionCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PredictionCaches
    * const predictionCaches = await prisma.predictionCache.findMany()
    * ```
    */
  get predictionCache(): Prisma.PredictionCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Household: 'Household',
    HouseholdMembership: 'HouseholdMembership',
    CaregiverInvite: 'CaregiverInvite',
    Baby: 'Baby',
    FeedingEvent: 'FeedingEvent',
    Consultation: 'Consultation',
    Appointment: 'Appointment',
    PredictionCache: 'PredictionCache',
    Account: 'Account',
    Session: 'Session',
    User: 'User',
    VerificationToken: 'VerificationToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "household" | "householdMembership" | "caregiverInvite" | "baby" | "feedingEvent" | "consultation" | "appointment" | "predictionCache" | "account" | "session" | "user" | "verificationToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Household: {
        payload: Prisma.$HouseholdPayload<ExtArgs>
        fields: Prisma.HouseholdFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HouseholdFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HouseholdFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          findFirst: {
            args: Prisma.HouseholdFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HouseholdFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          findMany: {
            args: Prisma.HouseholdFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>[]
          }
          create: {
            args: Prisma.HouseholdCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          createMany: {
            args: Prisma.HouseholdCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HouseholdCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>[]
          }
          delete: {
            args: Prisma.HouseholdDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          update: {
            args: Prisma.HouseholdUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          deleteMany: {
            args: Prisma.HouseholdDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HouseholdUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HouseholdUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>[]
          }
          upsert: {
            args: Prisma.HouseholdUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          aggregate: {
            args: Prisma.HouseholdAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHousehold>
          }
          groupBy: {
            args: Prisma.HouseholdGroupByArgs<ExtArgs>
            result: $Utils.Optional<HouseholdGroupByOutputType>[]
          }
          count: {
            args: Prisma.HouseholdCountArgs<ExtArgs>
            result: $Utils.Optional<HouseholdCountAggregateOutputType> | number
          }
        }
      }
      HouseholdMembership: {
        payload: Prisma.$HouseholdMembershipPayload<ExtArgs>
        fields: Prisma.HouseholdMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HouseholdMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HouseholdMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>
          }
          findFirst: {
            args: Prisma.HouseholdMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HouseholdMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>
          }
          findMany: {
            args: Prisma.HouseholdMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>[]
          }
          create: {
            args: Prisma.HouseholdMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>
          }
          createMany: {
            args: Prisma.HouseholdMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HouseholdMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>[]
          }
          delete: {
            args: Prisma.HouseholdMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>
          }
          update: {
            args: Prisma.HouseholdMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>
          }
          deleteMany: {
            args: Prisma.HouseholdMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HouseholdMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HouseholdMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>[]
          }
          upsert: {
            args: Prisma.HouseholdMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMembershipPayload>
          }
          aggregate: {
            args: Prisma.HouseholdMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHouseholdMembership>
          }
          groupBy: {
            args: Prisma.HouseholdMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<HouseholdMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.HouseholdMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<HouseholdMembershipCountAggregateOutputType> | number
          }
        }
      }
      CaregiverInvite: {
        payload: Prisma.$CaregiverInvitePayload<ExtArgs>
        fields: Prisma.CaregiverInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaregiverInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaregiverInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>
          }
          findFirst: {
            args: Prisma.CaregiverInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaregiverInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>
          }
          findMany: {
            args: Prisma.CaregiverInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>[]
          }
          create: {
            args: Prisma.CaregiverInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>
          }
          createMany: {
            args: Prisma.CaregiverInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaregiverInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>[]
          }
          delete: {
            args: Prisma.CaregiverInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>
          }
          update: {
            args: Prisma.CaregiverInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>
          }
          deleteMany: {
            args: Prisma.CaregiverInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaregiverInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaregiverInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>[]
          }
          upsert: {
            args: Prisma.CaregiverInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaregiverInvitePayload>
          }
          aggregate: {
            args: Prisma.CaregiverInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaregiverInvite>
          }
          groupBy: {
            args: Prisma.CaregiverInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaregiverInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaregiverInviteCountArgs<ExtArgs>
            result: $Utils.Optional<CaregiverInviteCountAggregateOutputType> | number
          }
        }
      }
      Baby: {
        payload: Prisma.$BabyPayload<ExtArgs>
        fields: Prisma.BabyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BabyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BabyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          findFirst: {
            args: Prisma.BabyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BabyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          findMany: {
            args: Prisma.BabyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>[]
          }
          create: {
            args: Prisma.BabyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          createMany: {
            args: Prisma.BabyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BabyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>[]
          }
          delete: {
            args: Prisma.BabyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          update: {
            args: Prisma.BabyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          deleteMany: {
            args: Prisma.BabyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BabyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BabyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>[]
          }
          upsert: {
            args: Prisma.BabyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          aggregate: {
            args: Prisma.BabyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBaby>
          }
          groupBy: {
            args: Prisma.BabyGroupByArgs<ExtArgs>
            result: $Utils.Optional<BabyGroupByOutputType>[]
          }
          count: {
            args: Prisma.BabyCountArgs<ExtArgs>
            result: $Utils.Optional<BabyCountAggregateOutputType> | number
          }
        }
      }
      FeedingEvent: {
        payload: Prisma.$FeedingEventPayload<ExtArgs>
        fields: Prisma.FeedingEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedingEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedingEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>
          }
          findFirst: {
            args: Prisma.FeedingEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedingEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>
          }
          findMany: {
            args: Prisma.FeedingEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>[]
          }
          create: {
            args: Prisma.FeedingEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>
          }
          createMany: {
            args: Prisma.FeedingEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedingEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>[]
          }
          delete: {
            args: Prisma.FeedingEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>
          }
          update: {
            args: Prisma.FeedingEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>
          }
          deleteMany: {
            args: Prisma.FeedingEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedingEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedingEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>[]
          }
          upsert: {
            args: Prisma.FeedingEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedingEventPayload>
          }
          aggregate: {
            args: Prisma.FeedingEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedingEvent>
          }
          groupBy: {
            args: Prisma.FeedingEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedingEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedingEventCountArgs<ExtArgs>
            result: $Utils.Optional<FeedingEventCountAggregateOutputType> | number
          }
        }
      }
      Consultation: {
        payload: Prisma.$ConsultationPayload<ExtArgs>
        fields: Prisma.ConsultationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findFirst: {
            args: Prisma.ConsultationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findMany: {
            args: Prisma.ConsultationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          create: {
            args: Prisma.ConsultationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          createMany: {
            args: Prisma.ConsultationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsultationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          delete: {
            args: Prisma.ConsultationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          update: {
            args: Prisma.ConsultationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsultationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          upsert: {
            args: Prisma.ConsultationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          aggregate: {
            args: Prisma.ConsultationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultation>
          }
          groupBy: {
            args: Prisma.ConsultationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      PredictionCache: {
        payload: Prisma.$PredictionCachePayload<ExtArgs>
        fields: Prisma.PredictionCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PredictionCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PredictionCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>
          }
          findFirst: {
            args: Prisma.PredictionCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PredictionCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>
          }
          findMany: {
            args: Prisma.PredictionCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>[]
          }
          create: {
            args: Prisma.PredictionCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>
          }
          createMany: {
            args: Prisma.PredictionCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PredictionCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>[]
          }
          delete: {
            args: Prisma.PredictionCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>
          }
          update: {
            args: Prisma.PredictionCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>
          }
          deleteMany: {
            args: Prisma.PredictionCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PredictionCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PredictionCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>[]
          }
          upsert: {
            args: Prisma.PredictionCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionCachePayload>
          }
          aggregate: {
            args: Prisma.PredictionCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePredictionCache>
          }
          groupBy: {
            args: Prisma.PredictionCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictionCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.PredictionCacheCountArgs<ExtArgs>
            result: $Utils.Optional<PredictionCacheCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    household?: HouseholdOmit
    householdMembership?: HouseholdMembershipOmit
    caregiverInvite?: CaregiverInviteOmit
    baby?: BabyOmit
    feedingEvent?: FeedingEventOmit
    consultation?: ConsultationOmit
    appointment?: AppointmentOmit
    predictionCache?: PredictionCacheOmit
    account?: AccountOmit
    session?: SessionOmit
    user?: UserOmit
    verificationToken?: VerificationTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type HouseholdCountOutputType
   */

  export type HouseholdCountOutputType = {
    memberships: number
    babies: number
    invites: number
  }

  export type HouseholdCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | HouseholdCountOutputTypeCountMembershipsArgs
    babies?: boolean | HouseholdCountOutputTypeCountBabiesArgs
    invites?: boolean | HouseholdCountOutputTypeCountInvitesArgs
  }

  // Custom InputTypes
  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdCountOutputType
     */
    select?: HouseholdCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdMembershipWhereInput
  }

  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeCountBabiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BabyWhereInput
  }

  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeCountInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaregiverInviteWhereInput
  }


  /**
   * Count Type BabyCountOutputType
   */

  export type BabyCountOutputType = {
    feedingEvents: number
    consultations: number
    appointments: number
    predictionCaches: number
  }

  export type BabyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedingEvents?: boolean | BabyCountOutputTypeCountFeedingEventsArgs
    consultations?: boolean | BabyCountOutputTypeCountConsultationsArgs
    appointments?: boolean | BabyCountOutputTypeCountAppointmentsArgs
    predictionCaches?: boolean | BabyCountOutputTypeCountPredictionCachesArgs
  }

  // Custom InputTypes
  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BabyCountOutputType
     */
    select?: BabyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeCountFeedingEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedingEventWhereInput
  }

  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }

  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeCountPredictionCachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictionCacheWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    householdMemberships: number
    invitesSent: number
    invitesAccepted: number
    feedingEventsLogged: number
    consultationsRecorded: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    householdMemberships?: boolean | UserCountOutputTypeCountHouseholdMembershipsArgs
    invitesSent?: boolean | UserCountOutputTypeCountInvitesSentArgs
    invitesAccepted?: boolean | UserCountOutputTypeCountInvitesAcceptedArgs
    feedingEventsLogged?: boolean | UserCountOutputTypeCountFeedingEventsLoggedArgs
    consultationsRecorded?: boolean | UserCountOutputTypeCountConsultationsRecordedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHouseholdMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdMembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitesSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaregiverInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitesAcceptedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaregiverInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedingEventsLoggedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedingEventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConsultationsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Household
   */

  export type AggregateHousehold = {
    _count: HouseholdCountAggregateOutputType | null
    _min: HouseholdMinAggregateOutputType | null
    _max: HouseholdMaxAggregateOutputType | null
  }

  export type HouseholdMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HouseholdMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HouseholdCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HouseholdMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HouseholdMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HouseholdCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HouseholdAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Household to aggregate.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Households
    **/
    _count?: true | HouseholdCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HouseholdMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HouseholdMaxAggregateInputType
  }

  export type GetHouseholdAggregateType<T extends HouseholdAggregateArgs> = {
        [P in keyof T & keyof AggregateHousehold]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHousehold[P]>
      : GetScalarType<T[P], AggregateHousehold[P]>
  }




  export type HouseholdGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdWhereInput
    orderBy?: HouseholdOrderByWithAggregationInput | HouseholdOrderByWithAggregationInput[]
    by: HouseholdScalarFieldEnum[] | HouseholdScalarFieldEnum
    having?: HouseholdScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HouseholdCountAggregateInputType | true
    _min?: HouseholdMinAggregateInputType
    _max?: HouseholdMaxAggregateInputType
  }

  export type HouseholdGroupByOutputType = {
    id: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: HouseholdCountAggregateOutputType | null
    _min: HouseholdMinAggregateOutputType | null
    _max: HouseholdMaxAggregateOutputType | null
  }

  type GetHouseholdGroupByPayload<T extends HouseholdGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HouseholdGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HouseholdGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HouseholdGroupByOutputType[P]>
            : GetScalarType<T[P], HouseholdGroupByOutputType[P]>
        }
      >
    >


  export type HouseholdSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberships?: boolean | Household$membershipsArgs<ExtArgs>
    babies?: boolean | Household$babiesArgs<ExtArgs>
    invites?: boolean | Household$invitesArgs<ExtArgs>
    _count?: boolean | HouseholdCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["household"]>

  export type HouseholdSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["household"]>

  export type HouseholdSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["household"]>

  export type HouseholdSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HouseholdOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["household"]>
  export type HouseholdInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | Household$membershipsArgs<ExtArgs>
    babies?: boolean | Household$babiesArgs<ExtArgs>
    invites?: boolean | Household$invitesArgs<ExtArgs>
    _count?: boolean | HouseholdCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HouseholdIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HouseholdIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HouseholdPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Household"
    objects: {
      memberships: Prisma.$HouseholdMembershipPayload<ExtArgs>[]
      babies: Prisma.$BabyPayload<ExtArgs>[]
      invites: Prisma.$CaregiverInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["household"]>
    composites: {}
  }

  type HouseholdGetPayload<S extends boolean | null | undefined | HouseholdDefaultArgs> = $Result.GetResult<Prisma.$HouseholdPayload, S>

  type HouseholdCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HouseholdFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HouseholdCountAggregateInputType | true
    }

  export interface HouseholdDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Household'], meta: { name: 'Household' } }
    /**
     * Find zero or one Household that matches the filter.
     * @param {HouseholdFindUniqueArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HouseholdFindUniqueArgs>(args: SelectSubset<T, HouseholdFindUniqueArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Household that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HouseholdFindUniqueOrThrowArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HouseholdFindUniqueOrThrowArgs>(args: SelectSubset<T, HouseholdFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Household that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdFindFirstArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HouseholdFindFirstArgs>(args?: SelectSubset<T, HouseholdFindFirstArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Household that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdFindFirstOrThrowArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HouseholdFindFirstOrThrowArgs>(args?: SelectSubset<T, HouseholdFindFirstOrThrowArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Households that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Households
     * const households = await prisma.household.findMany()
     * 
     * // Get first 10 Households
     * const households = await prisma.household.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const householdWithIdOnly = await prisma.household.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HouseholdFindManyArgs>(args?: SelectSubset<T, HouseholdFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Household.
     * @param {HouseholdCreateArgs} args - Arguments to create a Household.
     * @example
     * // Create one Household
     * const Household = await prisma.household.create({
     *   data: {
     *     // ... data to create a Household
     *   }
     * })
     * 
     */
    create<T extends HouseholdCreateArgs>(args: SelectSubset<T, HouseholdCreateArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Households.
     * @param {HouseholdCreateManyArgs} args - Arguments to create many Households.
     * @example
     * // Create many Households
     * const household = await prisma.household.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HouseholdCreateManyArgs>(args?: SelectSubset<T, HouseholdCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Households and returns the data saved in the database.
     * @param {HouseholdCreateManyAndReturnArgs} args - Arguments to create many Households.
     * @example
     * // Create many Households
     * const household = await prisma.household.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Households and only return the `id`
     * const householdWithIdOnly = await prisma.household.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HouseholdCreateManyAndReturnArgs>(args?: SelectSubset<T, HouseholdCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Household.
     * @param {HouseholdDeleteArgs} args - Arguments to delete one Household.
     * @example
     * // Delete one Household
     * const Household = await prisma.household.delete({
     *   where: {
     *     // ... filter to delete one Household
     *   }
     * })
     * 
     */
    delete<T extends HouseholdDeleteArgs>(args: SelectSubset<T, HouseholdDeleteArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Household.
     * @param {HouseholdUpdateArgs} args - Arguments to update one Household.
     * @example
     * // Update one Household
     * const household = await prisma.household.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HouseholdUpdateArgs>(args: SelectSubset<T, HouseholdUpdateArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Households.
     * @param {HouseholdDeleteManyArgs} args - Arguments to filter Households to delete.
     * @example
     * // Delete a few Households
     * const { count } = await prisma.household.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HouseholdDeleteManyArgs>(args?: SelectSubset<T, HouseholdDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Households.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Households
     * const household = await prisma.household.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HouseholdUpdateManyArgs>(args: SelectSubset<T, HouseholdUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Households and returns the data updated in the database.
     * @param {HouseholdUpdateManyAndReturnArgs} args - Arguments to update many Households.
     * @example
     * // Update many Households
     * const household = await prisma.household.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Households and only return the `id`
     * const householdWithIdOnly = await prisma.household.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HouseholdUpdateManyAndReturnArgs>(args: SelectSubset<T, HouseholdUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Household.
     * @param {HouseholdUpsertArgs} args - Arguments to update or create a Household.
     * @example
     * // Update or create a Household
     * const household = await prisma.household.upsert({
     *   create: {
     *     // ... data to create a Household
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Household we want to update
     *   }
     * })
     */
    upsert<T extends HouseholdUpsertArgs>(args: SelectSubset<T, HouseholdUpsertArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Households.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdCountArgs} args - Arguments to filter Households to count.
     * @example
     * // Count the number of Households
     * const count = await prisma.household.count({
     *   where: {
     *     // ... the filter for the Households we want to count
     *   }
     * })
    **/
    count<T extends HouseholdCountArgs>(
      args?: Subset<T, HouseholdCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HouseholdCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Household.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HouseholdAggregateArgs>(args: Subset<T, HouseholdAggregateArgs>): Prisma.PrismaPromise<GetHouseholdAggregateType<T>>

    /**
     * Group by Household.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HouseholdGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HouseholdGroupByArgs['orderBy'] }
        : { orderBy?: HouseholdGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HouseholdGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHouseholdGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Household model
   */
  readonly fields: HouseholdFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Household.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HouseholdClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends Household$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Household$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    babies<T extends Household$babiesArgs<ExtArgs> = {}>(args?: Subset<T, Household$babiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invites<T extends Household$invitesArgs<ExtArgs> = {}>(args?: Subset<T, Household$invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Household model
   */
  interface HouseholdFieldRefs {
    readonly id: FieldRef<"Household", 'String'>
    readonly name: FieldRef<"Household", 'String'>
    readonly createdAt: FieldRef<"Household", 'DateTime'>
    readonly updatedAt: FieldRef<"Household", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Household findUnique
   */
  export type HouseholdFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household findUniqueOrThrow
   */
  export type HouseholdFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household findFirst
   */
  export type HouseholdFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Households.
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Households.
     */
    distinct?: HouseholdScalarFieldEnum | HouseholdScalarFieldEnum[]
  }

  /**
   * Household findFirstOrThrow
   */
  export type HouseholdFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Households.
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Households.
     */
    distinct?: HouseholdScalarFieldEnum | HouseholdScalarFieldEnum[]
  }

  /**
   * Household findMany
   */
  export type HouseholdFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Households to fetch.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Households.
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    distinct?: HouseholdScalarFieldEnum | HouseholdScalarFieldEnum[]
  }

  /**
   * Household create
   */
  export type HouseholdCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * The data needed to create a Household.
     */
    data: XOR<HouseholdCreateInput, HouseholdUncheckedCreateInput>
  }

  /**
   * Household createMany
   */
  export type HouseholdCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Households.
     */
    data: HouseholdCreateManyInput | HouseholdCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Household createManyAndReturn
   */
  export type HouseholdCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * The data used to create many Households.
     */
    data: HouseholdCreateManyInput | HouseholdCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Household update
   */
  export type HouseholdUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * The data needed to update a Household.
     */
    data: XOR<HouseholdUpdateInput, HouseholdUncheckedUpdateInput>
    /**
     * Choose, which Household to update.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household updateMany
   */
  export type HouseholdUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Households.
     */
    data: XOR<HouseholdUpdateManyMutationInput, HouseholdUncheckedUpdateManyInput>
    /**
     * Filter which Households to update
     */
    where?: HouseholdWhereInput
    /**
     * Limit how many Households to update.
     */
    limit?: number
  }

  /**
   * Household updateManyAndReturn
   */
  export type HouseholdUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * The data used to update Households.
     */
    data: XOR<HouseholdUpdateManyMutationInput, HouseholdUncheckedUpdateManyInput>
    /**
     * Filter which Households to update
     */
    where?: HouseholdWhereInput
    /**
     * Limit how many Households to update.
     */
    limit?: number
  }

  /**
   * Household upsert
   */
  export type HouseholdUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * The filter to search for the Household to update in case it exists.
     */
    where: HouseholdWhereUniqueInput
    /**
     * In case the Household found by the `where` argument doesn't exist, create a new Household with this data.
     */
    create: XOR<HouseholdCreateInput, HouseholdUncheckedCreateInput>
    /**
     * In case the Household was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HouseholdUpdateInput, HouseholdUncheckedUpdateInput>
  }

  /**
   * Household delete
   */
  export type HouseholdDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter which Household to delete.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household deleteMany
   */
  export type HouseholdDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Households to delete
     */
    where?: HouseholdWhereInput
    /**
     * Limit how many Households to delete.
     */
    limit?: number
  }

  /**
   * Household.memberships
   */
  export type Household$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    where?: HouseholdMembershipWhereInput
    orderBy?: HouseholdMembershipOrderByWithRelationInput | HouseholdMembershipOrderByWithRelationInput[]
    cursor?: HouseholdMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HouseholdMembershipScalarFieldEnum | HouseholdMembershipScalarFieldEnum[]
  }

  /**
   * Household.babies
   */
  export type Household$babiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    where?: BabyWhereInput
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    cursor?: BabyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BabyScalarFieldEnum | BabyScalarFieldEnum[]
  }

  /**
   * Household.invites
   */
  export type Household$invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    where?: CaregiverInviteWhereInput
    orderBy?: CaregiverInviteOrderByWithRelationInput | CaregiverInviteOrderByWithRelationInput[]
    cursor?: CaregiverInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaregiverInviteScalarFieldEnum | CaregiverInviteScalarFieldEnum[]
  }

  /**
   * Household without action
   */
  export type HouseholdDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
  }


  /**
   * Model HouseholdMembership
   */

  export type AggregateHouseholdMembership = {
    _count: HouseholdMembershipCountAggregateOutputType | null
    _min: HouseholdMembershipMinAggregateOutputType | null
    _max: HouseholdMembershipMaxAggregateOutputType | null
  }

  export type HouseholdMembershipMinAggregateOutputType = {
    id: string | null
    userId: string | null
    householdId: string | null
    role: $Enums.HouseholdRole | null
    displayLabel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HouseholdMembershipMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    householdId: string | null
    role: $Enums.HouseholdRole | null
    displayLabel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HouseholdMembershipCountAggregateOutputType = {
    id: number
    userId: number
    householdId: number
    role: number
    displayLabel: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HouseholdMembershipMinAggregateInputType = {
    id?: true
    userId?: true
    householdId?: true
    role?: true
    displayLabel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HouseholdMembershipMaxAggregateInputType = {
    id?: true
    userId?: true
    householdId?: true
    role?: true
    displayLabel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HouseholdMembershipCountAggregateInputType = {
    id?: true
    userId?: true
    householdId?: true
    role?: true
    displayLabel?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HouseholdMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HouseholdMembership to aggregate.
     */
    where?: HouseholdMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMemberships to fetch.
     */
    orderBy?: HouseholdMembershipOrderByWithRelationInput | HouseholdMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HouseholdMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HouseholdMemberships
    **/
    _count?: true | HouseholdMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HouseholdMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HouseholdMembershipMaxAggregateInputType
  }

  export type GetHouseholdMembershipAggregateType<T extends HouseholdMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateHouseholdMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHouseholdMembership[P]>
      : GetScalarType<T[P], AggregateHouseholdMembership[P]>
  }




  export type HouseholdMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdMembershipWhereInput
    orderBy?: HouseholdMembershipOrderByWithAggregationInput | HouseholdMembershipOrderByWithAggregationInput[]
    by: HouseholdMembershipScalarFieldEnum[] | HouseholdMembershipScalarFieldEnum
    having?: HouseholdMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HouseholdMembershipCountAggregateInputType | true
    _min?: HouseholdMembershipMinAggregateInputType
    _max?: HouseholdMembershipMaxAggregateInputType
  }

  export type HouseholdMembershipGroupByOutputType = {
    id: string
    userId: string
    householdId: string
    role: $Enums.HouseholdRole
    displayLabel: string | null
    createdAt: Date
    updatedAt: Date
    _count: HouseholdMembershipCountAggregateOutputType | null
    _min: HouseholdMembershipMinAggregateOutputType | null
    _max: HouseholdMembershipMaxAggregateOutputType | null
  }

  type GetHouseholdMembershipGroupByPayload<T extends HouseholdMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HouseholdMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HouseholdMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HouseholdMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], HouseholdMembershipGroupByOutputType[P]>
        }
      >
    >


  export type HouseholdMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    householdId?: boolean
    role?: boolean
    displayLabel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdMembership"]>

  export type HouseholdMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    householdId?: boolean
    role?: boolean
    displayLabel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdMembership"]>

  export type HouseholdMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    householdId?: boolean
    role?: boolean
    displayLabel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdMembership"]>

  export type HouseholdMembershipSelectScalar = {
    id?: boolean
    userId?: boolean
    householdId?: boolean
    role?: boolean
    displayLabel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HouseholdMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "householdId" | "role" | "displayLabel" | "createdAt" | "updatedAt", ExtArgs["result"]["householdMembership"]>
  export type HouseholdMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }
  export type HouseholdMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }
  export type HouseholdMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }

  export type $HouseholdMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HouseholdMembership"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      household: Prisma.$HouseholdPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      householdId: string
      role: $Enums.HouseholdRole
      displayLabel: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["householdMembership"]>
    composites: {}
  }

  type HouseholdMembershipGetPayload<S extends boolean | null | undefined | HouseholdMembershipDefaultArgs> = $Result.GetResult<Prisma.$HouseholdMembershipPayload, S>

  type HouseholdMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HouseholdMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HouseholdMembershipCountAggregateInputType | true
    }

  export interface HouseholdMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HouseholdMembership'], meta: { name: 'HouseholdMembership' } }
    /**
     * Find zero or one HouseholdMembership that matches the filter.
     * @param {HouseholdMembershipFindUniqueArgs} args - Arguments to find a HouseholdMembership
     * @example
     * // Get one HouseholdMembership
     * const householdMembership = await prisma.householdMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HouseholdMembershipFindUniqueArgs>(args: SelectSubset<T, HouseholdMembershipFindUniqueArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HouseholdMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HouseholdMembershipFindUniqueOrThrowArgs} args - Arguments to find a HouseholdMembership
     * @example
     * // Get one HouseholdMembership
     * const householdMembership = await prisma.householdMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HouseholdMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, HouseholdMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HouseholdMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMembershipFindFirstArgs} args - Arguments to find a HouseholdMembership
     * @example
     * // Get one HouseholdMembership
     * const householdMembership = await prisma.householdMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HouseholdMembershipFindFirstArgs>(args?: SelectSubset<T, HouseholdMembershipFindFirstArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HouseholdMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMembershipFindFirstOrThrowArgs} args - Arguments to find a HouseholdMembership
     * @example
     * // Get one HouseholdMembership
     * const householdMembership = await prisma.householdMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HouseholdMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, HouseholdMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HouseholdMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HouseholdMemberships
     * const householdMemberships = await prisma.householdMembership.findMany()
     * 
     * // Get first 10 HouseholdMemberships
     * const householdMemberships = await prisma.householdMembership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const householdMembershipWithIdOnly = await prisma.householdMembership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HouseholdMembershipFindManyArgs>(args?: SelectSubset<T, HouseholdMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HouseholdMembership.
     * @param {HouseholdMembershipCreateArgs} args - Arguments to create a HouseholdMembership.
     * @example
     * // Create one HouseholdMembership
     * const HouseholdMembership = await prisma.householdMembership.create({
     *   data: {
     *     // ... data to create a HouseholdMembership
     *   }
     * })
     * 
     */
    create<T extends HouseholdMembershipCreateArgs>(args: SelectSubset<T, HouseholdMembershipCreateArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HouseholdMemberships.
     * @param {HouseholdMembershipCreateManyArgs} args - Arguments to create many HouseholdMemberships.
     * @example
     * // Create many HouseholdMemberships
     * const householdMembership = await prisma.householdMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HouseholdMembershipCreateManyArgs>(args?: SelectSubset<T, HouseholdMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HouseholdMemberships and returns the data saved in the database.
     * @param {HouseholdMembershipCreateManyAndReturnArgs} args - Arguments to create many HouseholdMemberships.
     * @example
     * // Create many HouseholdMemberships
     * const householdMembership = await prisma.householdMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HouseholdMemberships and only return the `id`
     * const householdMembershipWithIdOnly = await prisma.householdMembership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HouseholdMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, HouseholdMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HouseholdMembership.
     * @param {HouseholdMembershipDeleteArgs} args - Arguments to delete one HouseholdMembership.
     * @example
     * // Delete one HouseholdMembership
     * const HouseholdMembership = await prisma.householdMembership.delete({
     *   where: {
     *     // ... filter to delete one HouseholdMembership
     *   }
     * })
     * 
     */
    delete<T extends HouseholdMembershipDeleteArgs>(args: SelectSubset<T, HouseholdMembershipDeleteArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HouseholdMembership.
     * @param {HouseholdMembershipUpdateArgs} args - Arguments to update one HouseholdMembership.
     * @example
     * // Update one HouseholdMembership
     * const householdMembership = await prisma.householdMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HouseholdMembershipUpdateArgs>(args: SelectSubset<T, HouseholdMembershipUpdateArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HouseholdMemberships.
     * @param {HouseholdMembershipDeleteManyArgs} args - Arguments to filter HouseholdMemberships to delete.
     * @example
     * // Delete a few HouseholdMemberships
     * const { count } = await prisma.householdMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HouseholdMembershipDeleteManyArgs>(args?: SelectSubset<T, HouseholdMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HouseholdMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HouseholdMemberships
     * const householdMembership = await prisma.householdMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HouseholdMembershipUpdateManyArgs>(args: SelectSubset<T, HouseholdMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HouseholdMemberships and returns the data updated in the database.
     * @param {HouseholdMembershipUpdateManyAndReturnArgs} args - Arguments to update many HouseholdMemberships.
     * @example
     * // Update many HouseholdMemberships
     * const householdMembership = await prisma.householdMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HouseholdMemberships and only return the `id`
     * const householdMembershipWithIdOnly = await prisma.householdMembership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HouseholdMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, HouseholdMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HouseholdMembership.
     * @param {HouseholdMembershipUpsertArgs} args - Arguments to update or create a HouseholdMembership.
     * @example
     * // Update or create a HouseholdMembership
     * const householdMembership = await prisma.householdMembership.upsert({
     *   create: {
     *     // ... data to create a HouseholdMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HouseholdMembership we want to update
     *   }
     * })
     */
    upsert<T extends HouseholdMembershipUpsertArgs>(args: SelectSubset<T, HouseholdMembershipUpsertArgs<ExtArgs>>): Prisma__HouseholdMembershipClient<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HouseholdMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMembershipCountArgs} args - Arguments to filter HouseholdMemberships to count.
     * @example
     * // Count the number of HouseholdMemberships
     * const count = await prisma.householdMembership.count({
     *   where: {
     *     // ... the filter for the HouseholdMemberships we want to count
     *   }
     * })
    **/
    count<T extends HouseholdMembershipCountArgs>(
      args?: Subset<T, HouseholdMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HouseholdMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HouseholdMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HouseholdMembershipAggregateArgs>(args: Subset<T, HouseholdMembershipAggregateArgs>): Prisma.PrismaPromise<GetHouseholdMembershipAggregateType<T>>

    /**
     * Group by HouseholdMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HouseholdMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HouseholdMembershipGroupByArgs['orderBy'] }
        : { orderBy?: HouseholdMembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HouseholdMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHouseholdMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HouseholdMembership model
   */
  readonly fields: HouseholdMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HouseholdMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HouseholdMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    household<T extends HouseholdDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HouseholdDefaultArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HouseholdMembership model
   */
  interface HouseholdMembershipFieldRefs {
    readonly id: FieldRef<"HouseholdMembership", 'String'>
    readonly userId: FieldRef<"HouseholdMembership", 'String'>
    readonly householdId: FieldRef<"HouseholdMembership", 'String'>
    readonly role: FieldRef<"HouseholdMembership", 'HouseholdRole'>
    readonly displayLabel: FieldRef<"HouseholdMembership", 'String'>
    readonly createdAt: FieldRef<"HouseholdMembership", 'DateTime'>
    readonly updatedAt: FieldRef<"HouseholdMembership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HouseholdMembership findUnique
   */
  export type HouseholdMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMembership to fetch.
     */
    where: HouseholdMembershipWhereUniqueInput
  }

  /**
   * HouseholdMembership findUniqueOrThrow
   */
  export type HouseholdMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMembership to fetch.
     */
    where: HouseholdMembershipWhereUniqueInput
  }

  /**
   * HouseholdMembership findFirst
   */
  export type HouseholdMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMembership to fetch.
     */
    where?: HouseholdMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMemberships to fetch.
     */
    orderBy?: HouseholdMembershipOrderByWithRelationInput | HouseholdMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HouseholdMemberships.
     */
    cursor?: HouseholdMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdMemberships.
     */
    distinct?: HouseholdMembershipScalarFieldEnum | HouseholdMembershipScalarFieldEnum[]
  }

  /**
   * HouseholdMembership findFirstOrThrow
   */
  export type HouseholdMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMembership to fetch.
     */
    where?: HouseholdMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMemberships to fetch.
     */
    orderBy?: HouseholdMembershipOrderByWithRelationInput | HouseholdMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HouseholdMemberships.
     */
    cursor?: HouseholdMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdMemberships.
     */
    distinct?: HouseholdMembershipScalarFieldEnum | HouseholdMembershipScalarFieldEnum[]
  }

  /**
   * HouseholdMembership findMany
   */
  export type HouseholdMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMemberships to fetch.
     */
    where?: HouseholdMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMemberships to fetch.
     */
    orderBy?: HouseholdMembershipOrderByWithRelationInput | HouseholdMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HouseholdMemberships.
     */
    cursor?: HouseholdMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMemberships.
     */
    skip?: number
    distinct?: HouseholdMembershipScalarFieldEnum | HouseholdMembershipScalarFieldEnum[]
  }

  /**
   * HouseholdMembership create
   */
  export type HouseholdMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a HouseholdMembership.
     */
    data: XOR<HouseholdMembershipCreateInput, HouseholdMembershipUncheckedCreateInput>
  }

  /**
   * HouseholdMembership createMany
   */
  export type HouseholdMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HouseholdMemberships.
     */
    data: HouseholdMembershipCreateManyInput | HouseholdMembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HouseholdMembership createManyAndReturn
   */
  export type HouseholdMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many HouseholdMemberships.
     */
    data: HouseholdMembershipCreateManyInput | HouseholdMembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HouseholdMembership update
   */
  export type HouseholdMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a HouseholdMembership.
     */
    data: XOR<HouseholdMembershipUpdateInput, HouseholdMembershipUncheckedUpdateInput>
    /**
     * Choose, which HouseholdMembership to update.
     */
    where: HouseholdMembershipWhereUniqueInput
  }

  /**
   * HouseholdMembership updateMany
   */
  export type HouseholdMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HouseholdMemberships.
     */
    data: XOR<HouseholdMembershipUpdateManyMutationInput, HouseholdMembershipUncheckedUpdateManyInput>
    /**
     * Filter which HouseholdMemberships to update
     */
    where?: HouseholdMembershipWhereInput
    /**
     * Limit how many HouseholdMemberships to update.
     */
    limit?: number
  }

  /**
   * HouseholdMembership updateManyAndReturn
   */
  export type HouseholdMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * The data used to update HouseholdMemberships.
     */
    data: XOR<HouseholdMembershipUpdateManyMutationInput, HouseholdMembershipUncheckedUpdateManyInput>
    /**
     * Filter which HouseholdMemberships to update
     */
    where?: HouseholdMembershipWhereInput
    /**
     * Limit how many HouseholdMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HouseholdMembership upsert
   */
  export type HouseholdMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the HouseholdMembership to update in case it exists.
     */
    where: HouseholdMembershipWhereUniqueInput
    /**
     * In case the HouseholdMembership found by the `where` argument doesn't exist, create a new HouseholdMembership with this data.
     */
    create: XOR<HouseholdMembershipCreateInput, HouseholdMembershipUncheckedCreateInput>
    /**
     * In case the HouseholdMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HouseholdMembershipUpdateInput, HouseholdMembershipUncheckedUpdateInput>
  }

  /**
   * HouseholdMembership delete
   */
  export type HouseholdMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    /**
     * Filter which HouseholdMembership to delete.
     */
    where: HouseholdMembershipWhereUniqueInput
  }

  /**
   * HouseholdMembership deleteMany
   */
  export type HouseholdMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HouseholdMemberships to delete
     */
    where?: HouseholdMembershipWhereInput
    /**
     * Limit how many HouseholdMemberships to delete.
     */
    limit?: number
  }

  /**
   * HouseholdMembership without action
   */
  export type HouseholdMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
  }


  /**
   * Model CaregiverInvite
   */

  export type AggregateCaregiverInvite = {
    _count: CaregiverInviteCountAggregateOutputType | null
    _min: CaregiverInviteMinAggregateOutputType | null
    _max: CaregiverInviteMaxAggregateOutputType | null
  }

  export type CaregiverInviteMinAggregateOutputType = {
    id: string | null
    householdId: string | null
    emailNormalized: string | null
    token: string | null
    invitedByUserId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    acceptedAt: Date | null
    acceptedByUserId: string | null
  }

  export type CaregiverInviteMaxAggregateOutputType = {
    id: string | null
    householdId: string | null
    emailNormalized: string | null
    token: string | null
    invitedByUserId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    acceptedAt: Date | null
    acceptedByUserId: string | null
  }

  export type CaregiverInviteCountAggregateOutputType = {
    id: number
    householdId: number
    emailNormalized: number
    token: number
    invitedByUserId: number
    expiresAt: number
    revokedAt: number
    acceptedAt: number
    acceptedByUserId: number
    _all: number
  }


  export type CaregiverInviteMinAggregateInputType = {
    id?: true
    householdId?: true
    emailNormalized?: true
    token?: true
    invitedByUserId?: true
    expiresAt?: true
    revokedAt?: true
    acceptedAt?: true
    acceptedByUserId?: true
  }

  export type CaregiverInviteMaxAggregateInputType = {
    id?: true
    householdId?: true
    emailNormalized?: true
    token?: true
    invitedByUserId?: true
    expiresAt?: true
    revokedAt?: true
    acceptedAt?: true
    acceptedByUserId?: true
  }

  export type CaregiverInviteCountAggregateInputType = {
    id?: true
    householdId?: true
    emailNormalized?: true
    token?: true
    invitedByUserId?: true
    expiresAt?: true
    revokedAt?: true
    acceptedAt?: true
    acceptedByUserId?: true
    _all?: true
  }

  export type CaregiverInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaregiverInvite to aggregate.
     */
    where?: CaregiverInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaregiverInvites to fetch.
     */
    orderBy?: CaregiverInviteOrderByWithRelationInput | CaregiverInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaregiverInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaregiverInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaregiverInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaregiverInvites
    **/
    _count?: true | CaregiverInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaregiverInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaregiverInviteMaxAggregateInputType
  }

  export type GetCaregiverInviteAggregateType<T extends CaregiverInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateCaregiverInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaregiverInvite[P]>
      : GetScalarType<T[P], AggregateCaregiverInvite[P]>
  }




  export type CaregiverInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaregiverInviteWhereInput
    orderBy?: CaregiverInviteOrderByWithAggregationInput | CaregiverInviteOrderByWithAggregationInput[]
    by: CaregiverInviteScalarFieldEnum[] | CaregiverInviteScalarFieldEnum
    having?: CaregiverInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaregiverInviteCountAggregateInputType | true
    _min?: CaregiverInviteMinAggregateInputType
    _max?: CaregiverInviteMaxAggregateInputType
  }

  export type CaregiverInviteGroupByOutputType = {
    id: string
    householdId: string
    emailNormalized: string
    token: string
    invitedByUserId: string
    expiresAt: Date
    revokedAt: Date | null
    acceptedAt: Date | null
    acceptedByUserId: string | null
    _count: CaregiverInviteCountAggregateOutputType | null
    _min: CaregiverInviteMinAggregateOutputType | null
    _max: CaregiverInviteMaxAggregateOutputType | null
  }

  type GetCaregiverInviteGroupByPayload<T extends CaregiverInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaregiverInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaregiverInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaregiverInviteGroupByOutputType[P]>
            : GetScalarType<T[P], CaregiverInviteGroupByOutputType[P]>
        }
      >
    >


  export type CaregiverInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    emailNormalized?: boolean
    token?: boolean
    invitedByUserId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    acceptedAt?: boolean
    acceptedByUserId?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | CaregiverInvite$acceptedByArgs<ExtArgs>
  }, ExtArgs["result"]["caregiverInvite"]>

  export type CaregiverInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    emailNormalized?: boolean
    token?: boolean
    invitedByUserId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    acceptedAt?: boolean
    acceptedByUserId?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | CaregiverInvite$acceptedByArgs<ExtArgs>
  }, ExtArgs["result"]["caregiverInvite"]>

  export type CaregiverInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    emailNormalized?: boolean
    token?: boolean
    invitedByUserId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    acceptedAt?: boolean
    acceptedByUserId?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | CaregiverInvite$acceptedByArgs<ExtArgs>
  }, ExtArgs["result"]["caregiverInvite"]>

  export type CaregiverInviteSelectScalar = {
    id?: boolean
    householdId?: boolean
    emailNormalized?: boolean
    token?: boolean
    invitedByUserId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    acceptedAt?: boolean
    acceptedByUserId?: boolean
  }

  export type CaregiverInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "householdId" | "emailNormalized" | "token" | "invitedByUserId" | "expiresAt" | "revokedAt" | "acceptedAt" | "acceptedByUserId", ExtArgs["result"]["caregiverInvite"]>
  export type CaregiverInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | CaregiverInvite$acceptedByArgs<ExtArgs>
  }
  export type CaregiverInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | CaregiverInvite$acceptedByArgs<ExtArgs>
  }
  export type CaregiverInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | CaregiverInvite$acceptedByArgs<ExtArgs>
  }

  export type $CaregiverInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaregiverInvite"
    objects: {
      household: Prisma.$HouseholdPayload<ExtArgs>
      invitedBy: Prisma.$UserPayload<ExtArgs>
      acceptedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      householdId: string
      emailNormalized: string
      token: string
      invitedByUserId: string
      expiresAt: Date
      revokedAt: Date | null
      acceptedAt: Date | null
      acceptedByUserId: string | null
    }, ExtArgs["result"]["caregiverInvite"]>
    composites: {}
  }

  type CaregiverInviteGetPayload<S extends boolean | null | undefined | CaregiverInviteDefaultArgs> = $Result.GetResult<Prisma.$CaregiverInvitePayload, S>

  type CaregiverInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaregiverInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaregiverInviteCountAggregateInputType | true
    }

  export interface CaregiverInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaregiverInvite'], meta: { name: 'CaregiverInvite' } }
    /**
     * Find zero or one CaregiverInvite that matches the filter.
     * @param {CaregiverInviteFindUniqueArgs} args - Arguments to find a CaregiverInvite
     * @example
     * // Get one CaregiverInvite
     * const caregiverInvite = await prisma.caregiverInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaregiverInviteFindUniqueArgs>(args: SelectSubset<T, CaregiverInviteFindUniqueArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaregiverInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaregiverInviteFindUniqueOrThrowArgs} args - Arguments to find a CaregiverInvite
     * @example
     * // Get one CaregiverInvite
     * const caregiverInvite = await prisma.caregiverInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaregiverInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, CaregiverInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaregiverInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaregiverInviteFindFirstArgs} args - Arguments to find a CaregiverInvite
     * @example
     * // Get one CaregiverInvite
     * const caregiverInvite = await prisma.caregiverInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaregiverInviteFindFirstArgs>(args?: SelectSubset<T, CaregiverInviteFindFirstArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaregiverInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaregiverInviteFindFirstOrThrowArgs} args - Arguments to find a CaregiverInvite
     * @example
     * // Get one CaregiverInvite
     * const caregiverInvite = await prisma.caregiverInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaregiverInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, CaregiverInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaregiverInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaregiverInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaregiverInvites
     * const caregiverInvites = await prisma.caregiverInvite.findMany()
     * 
     * // Get first 10 CaregiverInvites
     * const caregiverInvites = await prisma.caregiverInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caregiverInviteWithIdOnly = await prisma.caregiverInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaregiverInviteFindManyArgs>(args?: SelectSubset<T, CaregiverInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaregiverInvite.
     * @param {CaregiverInviteCreateArgs} args - Arguments to create a CaregiverInvite.
     * @example
     * // Create one CaregiverInvite
     * const CaregiverInvite = await prisma.caregiverInvite.create({
     *   data: {
     *     // ... data to create a CaregiverInvite
     *   }
     * })
     * 
     */
    create<T extends CaregiverInviteCreateArgs>(args: SelectSubset<T, CaregiverInviteCreateArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaregiverInvites.
     * @param {CaregiverInviteCreateManyArgs} args - Arguments to create many CaregiverInvites.
     * @example
     * // Create many CaregiverInvites
     * const caregiverInvite = await prisma.caregiverInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaregiverInviteCreateManyArgs>(args?: SelectSubset<T, CaregiverInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaregiverInvites and returns the data saved in the database.
     * @param {CaregiverInviteCreateManyAndReturnArgs} args - Arguments to create many CaregiverInvites.
     * @example
     * // Create many CaregiverInvites
     * const caregiverInvite = await prisma.caregiverInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaregiverInvites and only return the `id`
     * const caregiverInviteWithIdOnly = await prisma.caregiverInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaregiverInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, CaregiverInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaregiverInvite.
     * @param {CaregiverInviteDeleteArgs} args - Arguments to delete one CaregiverInvite.
     * @example
     * // Delete one CaregiverInvite
     * const CaregiverInvite = await prisma.caregiverInvite.delete({
     *   where: {
     *     // ... filter to delete one CaregiverInvite
     *   }
     * })
     * 
     */
    delete<T extends CaregiverInviteDeleteArgs>(args: SelectSubset<T, CaregiverInviteDeleteArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaregiverInvite.
     * @param {CaregiverInviteUpdateArgs} args - Arguments to update one CaregiverInvite.
     * @example
     * // Update one CaregiverInvite
     * const caregiverInvite = await prisma.caregiverInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaregiverInviteUpdateArgs>(args: SelectSubset<T, CaregiverInviteUpdateArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaregiverInvites.
     * @param {CaregiverInviteDeleteManyArgs} args - Arguments to filter CaregiverInvites to delete.
     * @example
     * // Delete a few CaregiverInvites
     * const { count } = await prisma.caregiverInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaregiverInviteDeleteManyArgs>(args?: SelectSubset<T, CaregiverInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaregiverInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaregiverInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaregiverInvites
     * const caregiverInvite = await prisma.caregiverInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaregiverInviteUpdateManyArgs>(args: SelectSubset<T, CaregiverInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaregiverInvites and returns the data updated in the database.
     * @param {CaregiverInviteUpdateManyAndReturnArgs} args - Arguments to update many CaregiverInvites.
     * @example
     * // Update many CaregiverInvites
     * const caregiverInvite = await prisma.caregiverInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaregiverInvites and only return the `id`
     * const caregiverInviteWithIdOnly = await prisma.caregiverInvite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaregiverInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, CaregiverInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaregiverInvite.
     * @param {CaregiverInviteUpsertArgs} args - Arguments to update or create a CaregiverInvite.
     * @example
     * // Update or create a CaregiverInvite
     * const caregiverInvite = await prisma.caregiverInvite.upsert({
     *   create: {
     *     // ... data to create a CaregiverInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaregiverInvite we want to update
     *   }
     * })
     */
    upsert<T extends CaregiverInviteUpsertArgs>(args: SelectSubset<T, CaregiverInviteUpsertArgs<ExtArgs>>): Prisma__CaregiverInviteClient<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaregiverInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaregiverInviteCountArgs} args - Arguments to filter CaregiverInvites to count.
     * @example
     * // Count the number of CaregiverInvites
     * const count = await prisma.caregiverInvite.count({
     *   where: {
     *     // ... the filter for the CaregiverInvites we want to count
     *   }
     * })
    **/
    count<T extends CaregiverInviteCountArgs>(
      args?: Subset<T, CaregiverInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaregiverInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaregiverInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaregiverInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaregiverInviteAggregateArgs>(args: Subset<T, CaregiverInviteAggregateArgs>): Prisma.PrismaPromise<GetCaregiverInviteAggregateType<T>>

    /**
     * Group by CaregiverInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaregiverInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaregiverInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaregiverInviteGroupByArgs['orderBy'] }
        : { orderBy?: CaregiverInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaregiverInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaregiverInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaregiverInvite model
   */
  readonly fields: CaregiverInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaregiverInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaregiverInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    household<T extends HouseholdDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HouseholdDefaultArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    acceptedBy<T extends CaregiverInvite$acceptedByArgs<ExtArgs> = {}>(args?: Subset<T, CaregiverInvite$acceptedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CaregiverInvite model
   */
  interface CaregiverInviteFieldRefs {
    readonly id: FieldRef<"CaregiverInvite", 'String'>
    readonly householdId: FieldRef<"CaregiverInvite", 'String'>
    readonly emailNormalized: FieldRef<"CaregiverInvite", 'String'>
    readonly token: FieldRef<"CaregiverInvite", 'String'>
    readonly invitedByUserId: FieldRef<"CaregiverInvite", 'String'>
    readonly expiresAt: FieldRef<"CaregiverInvite", 'DateTime'>
    readonly revokedAt: FieldRef<"CaregiverInvite", 'DateTime'>
    readonly acceptedAt: FieldRef<"CaregiverInvite", 'DateTime'>
    readonly acceptedByUserId: FieldRef<"CaregiverInvite", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CaregiverInvite findUnique
   */
  export type CaregiverInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * Filter, which CaregiverInvite to fetch.
     */
    where: CaregiverInviteWhereUniqueInput
  }

  /**
   * CaregiverInvite findUniqueOrThrow
   */
  export type CaregiverInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * Filter, which CaregiverInvite to fetch.
     */
    where: CaregiverInviteWhereUniqueInput
  }

  /**
   * CaregiverInvite findFirst
   */
  export type CaregiverInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * Filter, which CaregiverInvite to fetch.
     */
    where?: CaregiverInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaregiverInvites to fetch.
     */
    orderBy?: CaregiverInviteOrderByWithRelationInput | CaregiverInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaregiverInvites.
     */
    cursor?: CaregiverInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaregiverInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaregiverInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaregiverInvites.
     */
    distinct?: CaregiverInviteScalarFieldEnum | CaregiverInviteScalarFieldEnum[]
  }

  /**
   * CaregiverInvite findFirstOrThrow
   */
  export type CaregiverInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * Filter, which CaregiverInvite to fetch.
     */
    where?: CaregiverInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaregiverInvites to fetch.
     */
    orderBy?: CaregiverInviteOrderByWithRelationInput | CaregiverInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaregiverInvites.
     */
    cursor?: CaregiverInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaregiverInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaregiverInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaregiverInvites.
     */
    distinct?: CaregiverInviteScalarFieldEnum | CaregiverInviteScalarFieldEnum[]
  }

  /**
   * CaregiverInvite findMany
   */
  export type CaregiverInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * Filter, which CaregiverInvites to fetch.
     */
    where?: CaregiverInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaregiverInvites to fetch.
     */
    orderBy?: CaregiverInviteOrderByWithRelationInput | CaregiverInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaregiverInvites.
     */
    cursor?: CaregiverInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaregiverInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaregiverInvites.
     */
    skip?: number
    distinct?: CaregiverInviteScalarFieldEnum | CaregiverInviteScalarFieldEnum[]
  }

  /**
   * CaregiverInvite create
   */
  export type CaregiverInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a CaregiverInvite.
     */
    data: XOR<CaregiverInviteCreateInput, CaregiverInviteUncheckedCreateInput>
  }

  /**
   * CaregiverInvite createMany
   */
  export type CaregiverInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaregiverInvites.
     */
    data: CaregiverInviteCreateManyInput | CaregiverInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaregiverInvite createManyAndReturn
   */
  export type CaregiverInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * The data used to create many CaregiverInvites.
     */
    data: CaregiverInviteCreateManyInput | CaregiverInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaregiverInvite update
   */
  export type CaregiverInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a CaregiverInvite.
     */
    data: XOR<CaregiverInviteUpdateInput, CaregiverInviteUncheckedUpdateInput>
    /**
     * Choose, which CaregiverInvite to update.
     */
    where: CaregiverInviteWhereUniqueInput
  }

  /**
   * CaregiverInvite updateMany
   */
  export type CaregiverInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaregiverInvites.
     */
    data: XOR<CaregiverInviteUpdateManyMutationInput, CaregiverInviteUncheckedUpdateManyInput>
    /**
     * Filter which CaregiverInvites to update
     */
    where?: CaregiverInviteWhereInput
    /**
     * Limit how many CaregiverInvites to update.
     */
    limit?: number
  }

  /**
   * CaregiverInvite updateManyAndReturn
   */
  export type CaregiverInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * The data used to update CaregiverInvites.
     */
    data: XOR<CaregiverInviteUpdateManyMutationInput, CaregiverInviteUncheckedUpdateManyInput>
    /**
     * Filter which CaregiverInvites to update
     */
    where?: CaregiverInviteWhereInput
    /**
     * Limit how many CaregiverInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaregiverInvite upsert
   */
  export type CaregiverInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the CaregiverInvite to update in case it exists.
     */
    where: CaregiverInviteWhereUniqueInput
    /**
     * In case the CaregiverInvite found by the `where` argument doesn't exist, create a new CaregiverInvite with this data.
     */
    create: XOR<CaregiverInviteCreateInput, CaregiverInviteUncheckedCreateInput>
    /**
     * In case the CaregiverInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaregiverInviteUpdateInput, CaregiverInviteUncheckedUpdateInput>
  }

  /**
   * CaregiverInvite delete
   */
  export type CaregiverInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    /**
     * Filter which CaregiverInvite to delete.
     */
    where: CaregiverInviteWhereUniqueInput
  }

  /**
   * CaregiverInvite deleteMany
   */
  export type CaregiverInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaregiverInvites to delete
     */
    where?: CaregiverInviteWhereInput
    /**
     * Limit how many CaregiverInvites to delete.
     */
    limit?: number
  }

  /**
   * CaregiverInvite.acceptedBy
   */
  export type CaregiverInvite$acceptedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CaregiverInvite without action
   */
  export type CaregiverInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
  }


  /**
   * Model Baby
   */

  export type AggregateBaby = {
    _count: BabyCountAggregateOutputType | null
    _avg: BabyAvgAggregateOutputType | null
    _sum: BabySumAggregateOutputType | null
    _min: BabyMinAggregateOutputType | null
    _max: BabyMaxAggregateOutputType | null
  }

  export type BabyAvgAggregateOutputType = {
    birthWeightGrams: number | null
    birthLengthCm: number | null
    headCircumferenceCm: number | null
  }

  export type BabySumAggregateOutputType = {
    birthWeightGrams: number | null
    birthLengthCm: number | null
    headCircumferenceCm: number | null
  }

  export type BabyMinAggregateOutputType = {
    id: string | null
    householdId: string | null
    displayName: string | null
    birthDateTime: Date | null
    birthWeightGrams: number | null
    birthLengthCm: number | null
    headCircumferenceCm: number | null
    sex: $Enums.BabySex | null
    notes: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BabyMaxAggregateOutputType = {
    id: string | null
    householdId: string | null
    displayName: string | null
    birthDateTime: Date | null
    birthWeightGrams: number | null
    birthLengthCm: number | null
    headCircumferenceCm: number | null
    sex: $Enums.BabySex | null
    notes: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BabyCountAggregateOutputType = {
    id: number
    householdId: number
    displayName: number
    birthDateTime: number
    birthWeightGrams: number
    birthLengthCm: number
    headCircumferenceCm: number
    sex: number
    notes: number
    timezone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BabyAvgAggregateInputType = {
    birthWeightGrams?: true
    birthLengthCm?: true
    headCircumferenceCm?: true
  }

  export type BabySumAggregateInputType = {
    birthWeightGrams?: true
    birthLengthCm?: true
    headCircumferenceCm?: true
  }

  export type BabyMinAggregateInputType = {
    id?: true
    householdId?: true
    displayName?: true
    birthDateTime?: true
    birthWeightGrams?: true
    birthLengthCm?: true
    headCircumferenceCm?: true
    sex?: true
    notes?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BabyMaxAggregateInputType = {
    id?: true
    householdId?: true
    displayName?: true
    birthDateTime?: true
    birthWeightGrams?: true
    birthLengthCm?: true
    headCircumferenceCm?: true
    sex?: true
    notes?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BabyCountAggregateInputType = {
    id?: true
    householdId?: true
    displayName?: true
    birthDateTime?: true
    birthWeightGrams?: true
    birthLengthCm?: true
    headCircumferenceCm?: true
    sex?: true
    notes?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BabyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Baby to aggregate.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Babies
    **/
    _count?: true | BabyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BabyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BabySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BabyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BabyMaxAggregateInputType
  }

  export type GetBabyAggregateType<T extends BabyAggregateArgs> = {
        [P in keyof T & keyof AggregateBaby]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBaby[P]>
      : GetScalarType<T[P], AggregateBaby[P]>
  }




  export type BabyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BabyWhereInput
    orderBy?: BabyOrderByWithAggregationInput | BabyOrderByWithAggregationInput[]
    by: BabyScalarFieldEnum[] | BabyScalarFieldEnum
    having?: BabyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BabyCountAggregateInputType | true
    _avg?: BabyAvgAggregateInputType
    _sum?: BabySumAggregateInputType
    _min?: BabyMinAggregateInputType
    _max?: BabyMaxAggregateInputType
  }

  export type BabyGroupByOutputType = {
    id: string
    householdId: string
    displayName: string
    birthDateTime: Date
    birthWeightGrams: number | null
    birthLengthCm: number | null
    headCircumferenceCm: number | null
    sex: $Enums.BabySex
    notes: string | null
    timezone: string
    createdAt: Date
    updatedAt: Date
    _count: BabyCountAggregateOutputType | null
    _avg: BabyAvgAggregateOutputType | null
    _sum: BabySumAggregateOutputType | null
    _min: BabyMinAggregateOutputType | null
    _max: BabyMaxAggregateOutputType | null
  }

  type GetBabyGroupByPayload<T extends BabyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BabyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BabyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BabyGroupByOutputType[P]>
            : GetScalarType<T[P], BabyGroupByOutputType[P]>
        }
      >
    >


  export type BabySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    displayName?: boolean
    birthDateTime?: boolean
    birthWeightGrams?: boolean
    birthLengthCm?: boolean
    headCircumferenceCm?: boolean
    sex?: boolean
    notes?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    feedingEvents?: boolean | Baby$feedingEventsArgs<ExtArgs>
    consultations?: boolean | Baby$consultationsArgs<ExtArgs>
    appointments?: boolean | Baby$appointmentsArgs<ExtArgs>
    predictionCaches?: boolean | Baby$predictionCachesArgs<ExtArgs>
    _count?: boolean | BabyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baby"]>

  export type BabySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    displayName?: boolean
    birthDateTime?: boolean
    birthWeightGrams?: boolean
    birthLengthCm?: boolean
    headCircumferenceCm?: boolean
    sex?: boolean
    notes?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baby"]>

  export type BabySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    displayName?: boolean
    birthDateTime?: boolean
    birthWeightGrams?: boolean
    birthLengthCm?: boolean
    headCircumferenceCm?: boolean
    sex?: boolean
    notes?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baby"]>

  export type BabySelectScalar = {
    id?: boolean
    householdId?: boolean
    displayName?: boolean
    birthDateTime?: boolean
    birthWeightGrams?: boolean
    birthLengthCm?: boolean
    headCircumferenceCm?: boolean
    sex?: boolean
    notes?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BabyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "householdId" | "displayName" | "birthDateTime" | "birthWeightGrams" | "birthLengthCm" | "headCircumferenceCm" | "sex" | "notes" | "timezone" | "createdAt" | "updatedAt", ExtArgs["result"]["baby"]>
  export type BabyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    feedingEvents?: boolean | Baby$feedingEventsArgs<ExtArgs>
    consultations?: boolean | Baby$consultationsArgs<ExtArgs>
    appointments?: boolean | Baby$appointmentsArgs<ExtArgs>
    predictionCaches?: boolean | Baby$predictionCachesArgs<ExtArgs>
    _count?: boolean | BabyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BabyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }
  export type BabyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }

  export type $BabyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Baby"
    objects: {
      household: Prisma.$HouseholdPayload<ExtArgs>
      feedingEvents: Prisma.$FeedingEventPayload<ExtArgs>[]
      consultations: Prisma.$ConsultationPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      predictionCaches: Prisma.$PredictionCachePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      householdId: string
      displayName: string
      birthDateTime: Date
      birthWeightGrams: number | null
      birthLengthCm: number | null
      headCircumferenceCm: number | null
      sex: $Enums.BabySex
      notes: string | null
      timezone: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["baby"]>
    composites: {}
  }

  type BabyGetPayload<S extends boolean | null | undefined | BabyDefaultArgs> = $Result.GetResult<Prisma.$BabyPayload, S>

  type BabyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BabyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BabyCountAggregateInputType | true
    }

  export interface BabyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Baby'], meta: { name: 'Baby' } }
    /**
     * Find zero or one Baby that matches the filter.
     * @param {BabyFindUniqueArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BabyFindUniqueArgs>(args: SelectSubset<T, BabyFindUniqueArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Baby that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BabyFindUniqueOrThrowArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BabyFindUniqueOrThrowArgs>(args: SelectSubset<T, BabyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Baby that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyFindFirstArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BabyFindFirstArgs>(args?: SelectSubset<T, BabyFindFirstArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Baby that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyFindFirstOrThrowArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BabyFindFirstOrThrowArgs>(args?: SelectSubset<T, BabyFindFirstOrThrowArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Babies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Babies
     * const babies = await prisma.baby.findMany()
     * 
     * // Get first 10 Babies
     * const babies = await prisma.baby.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const babyWithIdOnly = await prisma.baby.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BabyFindManyArgs>(args?: SelectSubset<T, BabyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Baby.
     * @param {BabyCreateArgs} args - Arguments to create a Baby.
     * @example
     * // Create one Baby
     * const Baby = await prisma.baby.create({
     *   data: {
     *     // ... data to create a Baby
     *   }
     * })
     * 
     */
    create<T extends BabyCreateArgs>(args: SelectSubset<T, BabyCreateArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Babies.
     * @param {BabyCreateManyArgs} args - Arguments to create many Babies.
     * @example
     * // Create many Babies
     * const baby = await prisma.baby.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BabyCreateManyArgs>(args?: SelectSubset<T, BabyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Babies and returns the data saved in the database.
     * @param {BabyCreateManyAndReturnArgs} args - Arguments to create many Babies.
     * @example
     * // Create many Babies
     * const baby = await prisma.baby.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Babies and only return the `id`
     * const babyWithIdOnly = await prisma.baby.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BabyCreateManyAndReturnArgs>(args?: SelectSubset<T, BabyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Baby.
     * @param {BabyDeleteArgs} args - Arguments to delete one Baby.
     * @example
     * // Delete one Baby
     * const Baby = await prisma.baby.delete({
     *   where: {
     *     // ... filter to delete one Baby
     *   }
     * })
     * 
     */
    delete<T extends BabyDeleteArgs>(args: SelectSubset<T, BabyDeleteArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Baby.
     * @param {BabyUpdateArgs} args - Arguments to update one Baby.
     * @example
     * // Update one Baby
     * const baby = await prisma.baby.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BabyUpdateArgs>(args: SelectSubset<T, BabyUpdateArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Babies.
     * @param {BabyDeleteManyArgs} args - Arguments to filter Babies to delete.
     * @example
     * // Delete a few Babies
     * const { count } = await prisma.baby.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BabyDeleteManyArgs>(args?: SelectSubset<T, BabyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Babies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Babies
     * const baby = await prisma.baby.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BabyUpdateManyArgs>(args: SelectSubset<T, BabyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Babies and returns the data updated in the database.
     * @param {BabyUpdateManyAndReturnArgs} args - Arguments to update many Babies.
     * @example
     * // Update many Babies
     * const baby = await prisma.baby.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Babies and only return the `id`
     * const babyWithIdOnly = await prisma.baby.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BabyUpdateManyAndReturnArgs>(args: SelectSubset<T, BabyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Baby.
     * @param {BabyUpsertArgs} args - Arguments to update or create a Baby.
     * @example
     * // Update or create a Baby
     * const baby = await prisma.baby.upsert({
     *   create: {
     *     // ... data to create a Baby
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Baby we want to update
     *   }
     * })
     */
    upsert<T extends BabyUpsertArgs>(args: SelectSubset<T, BabyUpsertArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Babies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyCountArgs} args - Arguments to filter Babies to count.
     * @example
     * // Count the number of Babies
     * const count = await prisma.baby.count({
     *   where: {
     *     // ... the filter for the Babies we want to count
     *   }
     * })
    **/
    count<T extends BabyCountArgs>(
      args?: Subset<T, BabyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BabyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Baby.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BabyAggregateArgs>(args: Subset<T, BabyAggregateArgs>): Prisma.PrismaPromise<GetBabyAggregateType<T>>

    /**
     * Group by Baby.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BabyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BabyGroupByArgs['orderBy'] }
        : { orderBy?: BabyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BabyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBabyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Baby model
   */
  readonly fields: BabyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Baby.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BabyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    household<T extends HouseholdDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HouseholdDefaultArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    feedingEvents<T extends Baby$feedingEventsArgs<ExtArgs> = {}>(args?: Subset<T, Baby$feedingEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consultations<T extends Baby$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, Baby$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Baby$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Baby$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    predictionCaches<T extends Baby$predictionCachesArgs<ExtArgs> = {}>(args?: Subset<T, Baby$predictionCachesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Baby model
   */
  interface BabyFieldRefs {
    readonly id: FieldRef<"Baby", 'String'>
    readonly householdId: FieldRef<"Baby", 'String'>
    readonly displayName: FieldRef<"Baby", 'String'>
    readonly birthDateTime: FieldRef<"Baby", 'DateTime'>
    readonly birthWeightGrams: FieldRef<"Baby", 'Int'>
    readonly birthLengthCm: FieldRef<"Baby", 'Int'>
    readonly headCircumferenceCm: FieldRef<"Baby", 'Int'>
    readonly sex: FieldRef<"Baby", 'BabySex'>
    readonly notes: FieldRef<"Baby", 'String'>
    readonly timezone: FieldRef<"Baby", 'String'>
    readonly createdAt: FieldRef<"Baby", 'DateTime'>
    readonly updatedAt: FieldRef<"Baby", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Baby findUnique
   */
  export type BabyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby findUniqueOrThrow
   */
  export type BabyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby findFirst
   */
  export type BabyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Babies.
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Babies.
     */
    distinct?: BabyScalarFieldEnum | BabyScalarFieldEnum[]
  }

  /**
   * Baby findFirstOrThrow
   */
  export type BabyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Babies.
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Babies.
     */
    distinct?: BabyScalarFieldEnum | BabyScalarFieldEnum[]
  }

  /**
   * Baby findMany
   */
  export type BabyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Babies to fetch.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Babies.
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    distinct?: BabyScalarFieldEnum | BabyScalarFieldEnum[]
  }

  /**
   * Baby create
   */
  export type BabyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * The data needed to create a Baby.
     */
    data: XOR<BabyCreateInput, BabyUncheckedCreateInput>
  }

  /**
   * Baby createMany
   */
  export type BabyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Babies.
     */
    data: BabyCreateManyInput | BabyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Baby createManyAndReturn
   */
  export type BabyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * The data used to create many Babies.
     */
    data: BabyCreateManyInput | BabyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Baby update
   */
  export type BabyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * The data needed to update a Baby.
     */
    data: XOR<BabyUpdateInput, BabyUncheckedUpdateInput>
    /**
     * Choose, which Baby to update.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby updateMany
   */
  export type BabyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Babies.
     */
    data: XOR<BabyUpdateManyMutationInput, BabyUncheckedUpdateManyInput>
    /**
     * Filter which Babies to update
     */
    where?: BabyWhereInput
    /**
     * Limit how many Babies to update.
     */
    limit?: number
  }

  /**
   * Baby updateManyAndReturn
   */
  export type BabyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * The data used to update Babies.
     */
    data: XOR<BabyUpdateManyMutationInput, BabyUncheckedUpdateManyInput>
    /**
     * Filter which Babies to update
     */
    where?: BabyWhereInput
    /**
     * Limit how many Babies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Baby upsert
   */
  export type BabyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * The filter to search for the Baby to update in case it exists.
     */
    where: BabyWhereUniqueInput
    /**
     * In case the Baby found by the `where` argument doesn't exist, create a new Baby with this data.
     */
    create: XOR<BabyCreateInput, BabyUncheckedCreateInput>
    /**
     * In case the Baby was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BabyUpdateInput, BabyUncheckedUpdateInput>
  }

  /**
   * Baby delete
   */
  export type BabyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter which Baby to delete.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby deleteMany
   */
  export type BabyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Babies to delete
     */
    where?: BabyWhereInput
    /**
     * Limit how many Babies to delete.
     */
    limit?: number
  }

  /**
   * Baby.feedingEvents
   */
  export type Baby$feedingEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    where?: FeedingEventWhereInput
    orderBy?: FeedingEventOrderByWithRelationInput | FeedingEventOrderByWithRelationInput[]
    cursor?: FeedingEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedingEventScalarFieldEnum | FeedingEventScalarFieldEnum[]
  }

  /**
   * Baby.consultations
   */
  export type Baby$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Baby.appointments
   */
  export type Baby$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Baby.predictionCaches
   */
  export type Baby$predictionCachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    where?: PredictionCacheWhereInput
    orderBy?: PredictionCacheOrderByWithRelationInput | PredictionCacheOrderByWithRelationInput[]
    cursor?: PredictionCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PredictionCacheScalarFieldEnum | PredictionCacheScalarFieldEnum[]
  }

  /**
   * Baby without action
   */
  export type BabyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
  }


  /**
   * Model FeedingEvent
   */

  export type AggregateFeedingEvent = {
    _count: FeedingEventCountAggregateOutputType | null
    _avg: FeedingEventAvgAggregateOutputType | null
    _sum: FeedingEventSumAggregateOutputType | null
    _min: FeedingEventMinAggregateOutputType | null
    _max: FeedingEventMaxAggregateOutputType | null
  }

  export type FeedingEventAvgAggregateOutputType = {
    amountMl: number | null
  }

  export type FeedingEventSumAggregateOutputType = {
    amountMl: number | null
  }

  export type FeedingEventMinAggregateOutputType = {
    id: string | null
    babyId: string | null
    loggedByUserId: string | null
    startedAt: Date | null
    endedAt: Date | null
    amountMl: number | null
    milkType: $Enums.MilkType | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedingEventMaxAggregateOutputType = {
    id: string | null
    babyId: string | null
    loggedByUserId: string | null
    startedAt: Date | null
    endedAt: Date | null
    amountMl: number | null
    milkType: $Enums.MilkType | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedingEventCountAggregateOutputType = {
    id: number
    babyId: number
    loggedByUserId: number
    startedAt: number
    endedAt: number
    amountMl: number
    milkType: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeedingEventAvgAggregateInputType = {
    amountMl?: true
  }

  export type FeedingEventSumAggregateInputType = {
    amountMl?: true
  }

  export type FeedingEventMinAggregateInputType = {
    id?: true
    babyId?: true
    loggedByUserId?: true
    startedAt?: true
    endedAt?: true
    amountMl?: true
    milkType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedingEventMaxAggregateInputType = {
    id?: true
    babyId?: true
    loggedByUserId?: true
    startedAt?: true
    endedAt?: true
    amountMl?: true
    milkType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedingEventCountAggregateInputType = {
    id?: true
    babyId?: true
    loggedByUserId?: true
    startedAt?: true
    endedAt?: true
    amountMl?: true
    milkType?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeedingEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedingEvent to aggregate.
     */
    where?: FeedingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedingEvents to fetch.
     */
    orderBy?: FeedingEventOrderByWithRelationInput | FeedingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedingEvents
    **/
    _count?: true | FeedingEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedingEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedingEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedingEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedingEventMaxAggregateInputType
  }

  export type GetFeedingEventAggregateType<T extends FeedingEventAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedingEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedingEvent[P]>
      : GetScalarType<T[P], AggregateFeedingEvent[P]>
  }




  export type FeedingEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedingEventWhereInput
    orderBy?: FeedingEventOrderByWithAggregationInput | FeedingEventOrderByWithAggregationInput[]
    by: FeedingEventScalarFieldEnum[] | FeedingEventScalarFieldEnum
    having?: FeedingEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedingEventCountAggregateInputType | true
    _avg?: FeedingEventAvgAggregateInputType
    _sum?: FeedingEventSumAggregateInputType
    _min?: FeedingEventMinAggregateInputType
    _max?: FeedingEventMaxAggregateInputType
  }

  export type FeedingEventGroupByOutputType = {
    id: string
    babyId: string
    loggedByUserId: string
    startedAt: Date
    endedAt: Date | null
    amountMl: number
    milkType: $Enums.MilkType
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: FeedingEventCountAggregateOutputType | null
    _avg: FeedingEventAvgAggregateOutputType | null
    _sum: FeedingEventSumAggregateOutputType | null
    _min: FeedingEventMinAggregateOutputType | null
    _max: FeedingEventMaxAggregateOutputType | null
  }

  type GetFeedingEventGroupByPayload<T extends FeedingEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedingEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedingEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedingEventGroupByOutputType[P]>
            : GetScalarType<T[P], FeedingEventGroupByOutputType[P]>
        }
      >
    >


  export type FeedingEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    loggedByUserId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    amountMl?: boolean
    milkType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    loggedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedingEvent"]>

  export type FeedingEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    loggedByUserId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    amountMl?: boolean
    milkType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    loggedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedingEvent"]>

  export type FeedingEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    loggedByUserId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    amountMl?: boolean
    milkType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    loggedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedingEvent"]>

  export type FeedingEventSelectScalar = {
    id?: boolean
    babyId?: boolean
    loggedByUserId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    amountMl?: boolean
    milkType?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeedingEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "babyId" | "loggedByUserId" | "startedAt" | "endedAt" | "amountMl" | "milkType" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["feedingEvent"]>
  export type FeedingEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    loggedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedingEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    loggedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedingEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    loggedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FeedingEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedingEvent"
    objects: {
      baby: Prisma.$BabyPayload<ExtArgs>
      loggedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      babyId: string
      loggedByUserId: string
      startedAt: Date
      endedAt: Date | null
      amountMl: number
      milkType: $Enums.MilkType
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["feedingEvent"]>
    composites: {}
  }

  type FeedingEventGetPayload<S extends boolean | null | undefined | FeedingEventDefaultArgs> = $Result.GetResult<Prisma.$FeedingEventPayload, S>

  type FeedingEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedingEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedingEventCountAggregateInputType | true
    }

  export interface FeedingEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedingEvent'], meta: { name: 'FeedingEvent' } }
    /**
     * Find zero or one FeedingEvent that matches the filter.
     * @param {FeedingEventFindUniqueArgs} args - Arguments to find a FeedingEvent
     * @example
     * // Get one FeedingEvent
     * const feedingEvent = await prisma.feedingEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedingEventFindUniqueArgs>(args: SelectSubset<T, FeedingEventFindUniqueArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeedingEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedingEventFindUniqueOrThrowArgs} args - Arguments to find a FeedingEvent
     * @example
     * // Get one FeedingEvent
     * const feedingEvent = await prisma.feedingEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedingEventFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedingEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedingEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedingEventFindFirstArgs} args - Arguments to find a FeedingEvent
     * @example
     * // Get one FeedingEvent
     * const feedingEvent = await prisma.feedingEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedingEventFindFirstArgs>(args?: SelectSubset<T, FeedingEventFindFirstArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedingEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedingEventFindFirstOrThrowArgs} args - Arguments to find a FeedingEvent
     * @example
     * // Get one FeedingEvent
     * const feedingEvent = await prisma.feedingEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedingEventFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedingEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeedingEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedingEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedingEvents
     * const feedingEvents = await prisma.feedingEvent.findMany()
     * 
     * // Get first 10 FeedingEvents
     * const feedingEvents = await prisma.feedingEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedingEventWithIdOnly = await prisma.feedingEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedingEventFindManyArgs>(args?: SelectSubset<T, FeedingEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeedingEvent.
     * @param {FeedingEventCreateArgs} args - Arguments to create a FeedingEvent.
     * @example
     * // Create one FeedingEvent
     * const FeedingEvent = await prisma.feedingEvent.create({
     *   data: {
     *     // ... data to create a FeedingEvent
     *   }
     * })
     * 
     */
    create<T extends FeedingEventCreateArgs>(args: SelectSubset<T, FeedingEventCreateArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeedingEvents.
     * @param {FeedingEventCreateManyArgs} args - Arguments to create many FeedingEvents.
     * @example
     * // Create many FeedingEvents
     * const feedingEvent = await prisma.feedingEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedingEventCreateManyArgs>(args?: SelectSubset<T, FeedingEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedingEvents and returns the data saved in the database.
     * @param {FeedingEventCreateManyAndReturnArgs} args - Arguments to create many FeedingEvents.
     * @example
     * // Create many FeedingEvents
     * const feedingEvent = await prisma.feedingEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedingEvents and only return the `id`
     * const feedingEventWithIdOnly = await prisma.feedingEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedingEventCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedingEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeedingEvent.
     * @param {FeedingEventDeleteArgs} args - Arguments to delete one FeedingEvent.
     * @example
     * // Delete one FeedingEvent
     * const FeedingEvent = await prisma.feedingEvent.delete({
     *   where: {
     *     // ... filter to delete one FeedingEvent
     *   }
     * })
     * 
     */
    delete<T extends FeedingEventDeleteArgs>(args: SelectSubset<T, FeedingEventDeleteArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeedingEvent.
     * @param {FeedingEventUpdateArgs} args - Arguments to update one FeedingEvent.
     * @example
     * // Update one FeedingEvent
     * const feedingEvent = await prisma.feedingEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedingEventUpdateArgs>(args: SelectSubset<T, FeedingEventUpdateArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeedingEvents.
     * @param {FeedingEventDeleteManyArgs} args - Arguments to filter FeedingEvents to delete.
     * @example
     * // Delete a few FeedingEvents
     * const { count } = await prisma.feedingEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedingEventDeleteManyArgs>(args?: SelectSubset<T, FeedingEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedingEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedingEvents
     * const feedingEvent = await prisma.feedingEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedingEventUpdateManyArgs>(args: SelectSubset<T, FeedingEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedingEvents and returns the data updated in the database.
     * @param {FeedingEventUpdateManyAndReturnArgs} args - Arguments to update many FeedingEvents.
     * @example
     * // Update many FeedingEvents
     * const feedingEvent = await prisma.feedingEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeedingEvents and only return the `id`
     * const feedingEventWithIdOnly = await prisma.feedingEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedingEventUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedingEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeedingEvent.
     * @param {FeedingEventUpsertArgs} args - Arguments to update or create a FeedingEvent.
     * @example
     * // Update or create a FeedingEvent
     * const feedingEvent = await prisma.feedingEvent.upsert({
     *   create: {
     *     // ... data to create a FeedingEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedingEvent we want to update
     *   }
     * })
     */
    upsert<T extends FeedingEventUpsertArgs>(args: SelectSubset<T, FeedingEventUpsertArgs<ExtArgs>>): Prisma__FeedingEventClient<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeedingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedingEventCountArgs} args - Arguments to filter FeedingEvents to count.
     * @example
     * // Count the number of FeedingEvents
     * const count = await prisma.feedingEvent.count({
     *   where: {
     *     // ... the filter for the FeedingEvents we want to count
     *   }
     * })
    **/
    count<T extends FeedingEventCountArgs>(
      args?: Subset<T, FeedingEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedingEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedingEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedingEventAggregateArgs>(args: Subset<T, FeedingEventAggregateArgs>): Prisma.PrismaPromise<GetFeedingEventAggregateType<T>>

    /**
     * Group by FeedingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedingEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedingEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedingEventGroupByArgs['orderBy'] }
        : { orderBy?: FeedingEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedingEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedingEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedingEvent model
   */
  readonly fields: FeedingEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedingEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedingEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baby<T extends BabyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BabyDefaultArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    loggedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedingEvent model
   */
  interface FeedingEventFieldRefs {
    readonly id: FieldRef<"FeedingEvent", 'String'>
    readonly babyId: FieldRef<"FeedingEvent", 'String'>
    readonly loggedByUserId: FieldRef<"FeedingEvent", 'String'>
    readonly startedAt: FieldRef<"FeedingEvent", 'DateTime'>
    readonly endedAt: FieldRef<"FeedingEvent", 'DateTime'>
    readonly amountMl: FieldRef<"FeedingEvent", 'Int'>
    readonly milkType: FieldRef<"FeedingEvent", 'MilkType'>
    readonly notes: FieldRef<"FeedingEvent", 'String'>
    readonly createdAt: FieldRef<"FeedingEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"FeedingEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeedingEvent findUnique
   */
  export type FeedingEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * Filter, which FeedingEvent to fetch.
     */
    where: FeedingEventWhereUniqueInput
  }

  /**
   * FeedingEvent findUniqueOrThrow
   */
  export type FeedingEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * Filter, which FeedingEvent to fetch.
     */
    where: FeedingEventWhereUniqueInput
  }

  /**
   * FeedingEvent findFirst
   */
  export type FeedingEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * Filter, which FeedingEvent to fetch.
     */
    where?: FeedingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedingEvents to fetch.
     */
    orderBy?: FeedingEventOrderByWithRelationInput | FeedingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedingEvents.
     */
    cursor?: FeedingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedingEvents.
     */
    distinct?: FeedingEventScalarFieldEnum | FeedingEventScalarFieldEnum[]
  }

  /**
   * FeedingEvent findFirstOrThrow
   */
  export type FeedingEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * Filter, which FeedingEvent to fetch.
     */
    where?: FeedingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedingEvents to fetch.
     */
    orderBy?: FeedingEventOrderByWithRelationInput | FeedingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedingEvents.
     */
    cursor?: FeedingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedingEvents.
     */
    distinct?: FeedingEventScalarFieldEnum | FeedingEventScalarFieldEnum[]
  }

  /**
   * FeedingEvent findMany
   */
  export type FeedingEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * Filter, which FeedingEvents to fetch.
     */
    where?: FeedingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedingEvents to fetch.
     */
    orderBy?: FeedingEventOrderByWithRelationInput | FeedingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedingEvents.
     */
    cursor?: FeedingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedingEvents.
     */
    skip?: number
    distinct?: FeedingEventScalarFieldEnum | FeedingEventScalarFieldEnum[]
  }

  /**
   * FeedingEvent create
   */
  export type FeedingEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * The data needed to create a FeedingEvent.
     */
    data: XOR<FeedingEventCreateInput, FeedingEventUncheckedCreateInput>
  }

  /**
   * FeedingEvent createMany
   */
  export type FeedingEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedingEvents.
     */
    data: FeedingEventCreateManyInput | FeedingEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedingEvent createManyAndReturn
   */
  export type FeedingEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * The data used to create many FeedingEvents.
     */
    data: FeedingEventCreateManyInput | FeedingEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedingEvent update
   */
  export type FeedingEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * The data needed to update a FeedingEvent.
     */
    data: XOR<FeedingEventUpdateInput, FeedingEventUncheckedUpdateInput>
    /**
     * Choose, which FeedingEvent to update.
     */
    where: FeedingEventWhereUniqueInput
  }

  /**
   * FeedingEvent updateMany
   */
  export type FeedingEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedingEvents.
     */
    data: XOR<FeedingEventUpdateManyMutationInput, FeedingEventUncheckedUpdateManyInput>
    /**
     * Filter which FeedingEvents to update
     */
    where?: FeedingEventWhereInput
    /**
     * Limit how many FeedingEvents to update.
     */
    limit?: number
  }

  /**
   * FeedingEvent updateManyAndReturn
   */
  export type FeedingEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * The data used to update FeedingEvents.
     */
    data: XOR<FeedingEventUpdateManyMutationInput, FeedingEventUncheckedUpdateManyInput>
    /**
     * Filter which FeedingEvents to update
     */
    where?: FeedingEventWhereInput
    /**
     * Limit how many FeedingEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedingEvent upsert
   */
  export type FeedingEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * The filter to search for the FeedingEvent to update in case it exists.
     */
    where: FeedingEventWhereUniqueInput
    /**
     * In case the FeedingEvent found by the `where` argument doesn't exist, create a new FeedingEvent with this data.
     */
    create: XOR<FeedingEventCreateInput, FeedingEventUncheckedCreateInput>
    /**
     * In case the FeedingEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedingEventUpdateInput, FeedingEventUncheckedUpdateInput>
  }

  /**
   * FeedingEvent delete
   */
  export type FeedingEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    /**
     * Filter which FeedingEvent to delete.
     */
    where: FeedingEventWhereUniqueInput
  }

  /**
   * FeedingEvent deleteMany
   */
  export type FeedingEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedingEvents to delete
     */
    where?: FeedingEventWhereInput
    /**
     * Limit how many FeedingEvents to delete.
     */
    limit?: number
  }

  /**
   * FeedingEvent without action
   */
  export type FeedingEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
  }


  /**
   * Model Consultation
   */

  export type AggregateConsultation = {
    _count: ConsultationCountAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  export type ConsultationMinAggregateOutputType = {
    id: string | null
    babyId: string | null
    recordedById: string | null
    occurredAt: Date | null
    location: string | null
    reason: string | null
    outcomeNotes: string | null
    providerName: string | null
    followUpAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConsultationMaxAggregateOutputType = {
    id: string | null
    babyId: string | null
    recordedById: string | null
    occurredAt: Date | null
    location: string | null
    reason: string | null
    outcomeNotes: string | null
    providerName: string | null
    followUpAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConsultationCountAggregateOutputType = {
    id: number
    babyId: number
    recordedById: number
    occurredAt: number
    location: number
    reason: number
    outcomeNotes: number
    providerName: number
    followUpAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConsultationMinAggregateInputType = {
    id?: true
    babyId?: true
    recordedById?: true
    occurredAt?: true
    location?: true
    reason?: true
    outcomeNotes?: true
    providerName?: true
    followUpAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConsultationMaxAggregateInputType = {
    id?: true
    babyId?: true
    recordedById?: true
    occurredAt?: true
    location?: true
    reason?: true
    outcomeNotes?: true
    providerName?: true
    followUpAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConsultationCountAggregateInputType = {
    id?: true
    babyId?: true
    recordedById?: true
    occurredAt?: true
    location?: true
    reason?: true
    outcomeNotes?: true
    providerName?: true
    followUpAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConsultationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultation to aggregate.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consultations
    **/
    _count?: true | ConsultationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationMaxAggregateInputType
  }

  export type GetConsultationAggregateType<T extends ConsultationAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultation[P]>
      : GetScalarType<T[P], AggregateConsultation[P]>
  }




  export type ConsultationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithAggregationInput | ConsultationOrderByWithAggregationInput[]
    by: ConsultationScalarFieldEnum[] | ConsultationScalarFieldEnum
    having?: ConsultationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationCountAggregateInputType | true
    _min?: ConsultationMinAggregateInputType
    _max?: ConsultationMaxAggregateInputType
  }

  export type ConsultationGroupByOutputType = {
    id: string
    babyId: string
    recordedById: string | null
    occurredAt: Date
    location: string
    reason: string
    outcomeNotes: string | null
    providerName: string | null
    followUpAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ConsultationCountAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  type GetConsultationGroupByPayload<T extends ConsultationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    recordedById?: boolean
    occurredAt?: boolean
    location?: boolean
    reason?: boolean
    outcomeNotes?: boolean
    providerName?: boolean
    followUpAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    recordedBy?: boolean | Consultation$recordedByArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    recordedById?: boolean
    occurredAt?: boolean
    location?: boolean
    reason?: boolean
    outcomeNotes?: boolean
    providerName?: boolean
    followUpAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    recordedBy?: boolean | Consultation$recordedByArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    recordedById?: boolean
    occurredAt?: boolean
    location?: boolean
    reason?: boolean
    outcomeNotes?: boolean
    providerName?: boolean
    followUpAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    recordedBy?: boolean | Consultation$recordedByArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectScalar = {
    id?: boolean
    babyId?: boolean
    recordedById?: boolean
    occurredAt?: boolean
    location?: boolean
    reason?: boolean
    outcomeNotes?: boolean
    providerName?: boolean
    followUpAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConsultationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "babyId" | "recordedById" | "occurredAt" | "location" | "reason" | "outcomeNotes" | "providerName" | "followUpAt" | "createdAt" | "updatedAt", ExtArgs["result"]["consultation"]>
  export type ConsultationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    recordedBy?: boolean | Consultation$recordedByArgs<ExtArgs>
  }
  export type ConsultationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    recordedBy?: boolean | Consultation$recordedByArgs<ExtArgs>
  }
  export type ConsultationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
    recordedBy?: boolean | Consultation$recordedByArgs<ExtArgs>
  }

  export type $ConsultationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consultation"
    objects: {
      baby: Prisma.$BabyPayload<ExtArgs>
      recordedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      babyId: string
      recordedById: string | null
      occurredAt: Date
      location: string
      reason: string
      outcomeNotes: string | null
      providerName: string | null
      followUpAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["consultation"]>
    composites: {}
  }

  type ConsultationGetPayload<S extends boolean | null | undefined | ConsultationDefaultArgs> = $Result.GetResult<Prisma.$ConsultationPayload, S>

  type ConsultationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationCountAggregateInputType | true
    }

  export interface ConsultationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consultation'], meta: { name: 'Consultation' } }
    /**
     * Find zero or one Consultation that matches the filter.
     * @param {ConsultationFindUniqueArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationFindUniqueArgs>(args: SelectSubset<T, ConsultationFindUniqueArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consultation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationFindUniqueOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationFindFirstArgs>(args?: SelectSubset<T, ConsultationFindFirstArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultations
     * const consultations = await prisma.consultation.findMany()
     * 
     * // Get first 10 Consultations
     * const consultations = await prisma.consultation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultationWithIdOnly = await prisma.consultation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsultationFindManyArgs>(args?: SelectSubset<T, ConsultationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consultation.
     * @param {ConsultationCreateArgs} args - Arguments to create a Consultation.
     * @example
     * // Create one Consultation
     * const Consultation = await prisma.consultation.create({
     *   data: {
     *     // ... data to create a Consultation
     *   }
     * })
     * 
     */
    create<T extends ConsultationCreateArgs>(args: SelectSubset<T, ConsultationCreateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultations.
     * @param {ConsultationCreateManyArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationCreateManyArgs>(args?: SelectSubset<T, ConsultationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consultations and returns the data saved in the database.
     * @param {ConsultationCreateManyAndReturnArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsultationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsultationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consultation.
     * @param {ConsultationDeleteArgs} args - Arguments to delete one Consultation.
     * @example
     * // Delete one Consultation
     * const Consultation = await prisma.consultation.delete({
     *   where: {
     *     // ... filter to delete one Consultation
     *   }
     * })
     * 
     */
    delete<T extends ConsultationDeleteArgs>(args: SelectSubset<T, ConsultationDeleteArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consultation.
     * @param {ConsultationUpdateArgs} args - Arguments to update one Consultation.
     * @example
     * // Update one Consultation
     * const consultation = await prisma.consultation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationUpdateArgs>(args: SelectSubset<T, ConsultationUpdateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultations.
     * @param {ConsultationDeleteManyArgs} args - Arguments to filter Consultations to delete.
     * @example
     * // Delete a few Consultations
     * const { count } = await prisma.consultation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationDeleteManyArgs>(args?: SelectSubset<T, ConsultationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationUpdateManyArgs>(args: SelectSubset<T, ConsultationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations and returns the data updated in the database.
     * @param {ConsultationUpdateManyAndReturnArgs} args - Arguments to update many Consultations.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsultationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsultationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consultation.
     * @param {ConsultationUpsertArgs} args - Arguments to update or create a Consultation.
     * @example
     * // Update or create a Consultation
     * const consultation = await prisma.consultation.upsert({
     *   create: {
     *     // ... data to create a Consultation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consultation we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationUpsertArgs>(args: SelectSubset<T, ConsultationUpsertArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationCountArgs} args - Arguments to filter Consultations to count.
     * @example
     * // Count the number of Consultations
     * const count = await prisma.consultation.count({
     *   where: {
     *     // ... the filter for the Consultations we want to count
     *   }
     * })
    **/
    count<T extends ConsultationCountArgs>(
      args?: Subset<T, ConsultationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationAggregateArgs>(args: Subset<T, ConsultationAggregateArgs>): Prisma.PrismaPromise<GetConsultationAggregateType<T>>

    /**
     * Group by Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consultation model
   */
  readonly fields: ConsultationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consultation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baby<T extends BabyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BabyDefaultArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recordedBy<T extends Consultation$recordedByArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$recordedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consultation model
   */
  interface ConsultationFieldRefs {
    readonly id: FieldRef<"Consultation", 'String'>
    readonly babyId: FieldRef<"Consultation", 'String'>
    readonly recordedById: FieldRef<"Consultation", 'String'>
    readonly occurredAt: FieldRef<"Consultation", 'DateTime'>
    readonly location: FieldRef<"Consultation", 'String'>
    readonly reason: FieldRef<"Consultation", 'String'>
    readonly outcomeNotes: FieldRef<"Consultation", 'String'>
    readonly providerName: FieldRef<"Consultation", 'String'>
    readonly followUpAt: FieldRef<"Consultation", 'DateTime'>
    readonly createdAt: FieldRef<"Consultation", 'DateTime'>
    readonly updatedAt: FieldRef<"Consultation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consultation findUnique
   */
  export type ConsultationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findUniqueOrThrow
   */
  export type ConsultationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findFirst
   */
  export type ConsultationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findFirstOrThrow
   */
  export type ConsultationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findMany
   */
  export type ConsultationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultations to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation create
   */
  export type ConsultationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to create a Consultation.
     */
    data: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
  }

  /**
   * Consultation createMany
   */
  export type ConsultationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consultation createManyAndReturn
   */
  export type ConsultationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation update
   */
  export type ConsultationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to update a Consultation.
     */
    data: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
    /**
     * Choose, which Consultation to update.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation updateMany
   */
  export type ConsultationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
  }

  /**
   * Consultation updateManyAndReturn
   */
  export type ConsultationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation upsert
   */
  export type ConsultationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The filter to search for the Consultation to update in case it exists.
     */
    where: ConsultationWhereUniqueInput
    /**
     * In case the Consultation found by the `where` argument doesn't exist, create a new Consultation with this data.
     */
    create: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
    /**
     * In case the Consultation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
  }

  /**
   * Consultation delete
   */
  export type ConsultationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter which Consultation to delete.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation deleteMany
   */
  export type ConsultationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultations to delete
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to delete.
     */
    limit?: number
  }

  /**
   * Consultation.recordedBy
   */
  export type Consultation$recordedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Consultation without action
   */
  export type ConsultationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    babyId: string | null
    title: string | null
    startsAt: Date | null
    endsAt: Date | null
    location: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    babyId: string | null
    title: string | null
    startsAt: Date | null
    endsAt: Date | null
    location: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    babyId: number
    title: number
    startsAt: number
    endsAt: number
    location: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    babyId?: true
    title?: true
    startsAt?: true
    endsAt?: true
    location?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    babyId?: true
    title?: true
    startsAt?: true
    endsAt?: true
    location?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    babyId?: true
    title?: true
    startsAt?: true
    endsAt?: true
    location?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    babyId: string
    title: string
    startsAt: Date
    endsAt: Date | null
    location: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    title?: boolean
    startsAt?: boolean
    endsAt?: boolean
    location?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    title?: boolean
    startsAt?: boolean
    endsAt?: boolean
    location?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    title?: boolean
    startsAt?: boolean
    endsAt?: boolean
    location?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    babyId?: boolean
    title?: boolean
    startsAt?: boolean
    endsAt?: boolean
    location?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "babyId" | "title" | "startsAt" | "endsAt" | "location" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      baby: Prisma.$BabyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      babyId: string
      title: string
      startsAt: Date
      endsAt: Date | null
      location: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baby<T extends BabyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BabyDefaultArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly babyId: FieldRef<"Appointment", 'String'>
    readonly title: FieldRef<"Appointment", 'String'>
    readonly startsAt: FieldRef<"Appointment", 'DateTime'>
    readonly endsAt: FieldRef<"Appointment", 'DateTime'>
    readonly location: FieldRef<"Appointment", 'String'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model PredictionCache
   */

  export type AggregatePredictionCache = {
    _count: PredictionCacheCountAggregateOutputType | null
    _min: PredictionCacheMinAggregateOutputType | null
    _max: PredictionCacheMaxAggregateOutputType | null
  }

  export type PredictionCacheMinAggregateOutputType = {
    id: string | null
    babyId: string | null
    kind: string | null
    inputFingerprint: string | null
    modelVersion: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PredictionCacheMaxAggregateOutputType = {
    id: string | null
    babyId: string | null
    kind: string | null
    inputFingerprint: string | null
    modelVersion: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PredictionCacheCountAggregateOutputType = {
    id: number
    babyId: number
    kind: number
    inputFingerprint: number
    payload: number
    modelVersion: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type PredictionCacheMinAggregateInputType = {
    id?: true
    babyId?: true
    kind?: true
    inputFingerprint?: true
    modelVersion?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PredictionCacheMaxAggregateInputType = {
    id?: true
    babyId?: true
    kind?: true
    inputFingerprint?: true
    modelVersion?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PredictionCacheCountAggregateInputType = {
    id?: true
    babyId?: true
    kind?: true
    inputFingerprint?: true
    payload?: true
    modelVersion?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type PredictionCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PredictionCache to aggregate.
     */
    where?: PredictionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionCaches to fetch.
     */
    orderBy?: PredictionCacheOrderByWithRelationInput | PredictionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PredictionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PredictionCaches
    **/
    _count?: true | PredictionCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PredictionCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PredictionCacheMaxAggregateInputType
  }

  export type GetPredictionCacheAggregateType<T extends PredictionCacheAggregateArgs> = {
        [P in keyof T & keyof AggregatePredictionCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePredictionCache[P]>
      : GetScalarType<T[P], AggregatePredictionCache[P]>
  }




  export type PredictionCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictionCacheWhereInput
    orderBy?: PredictionCacheOrderByWithAggregationInput | PredictionCacheOrderByWithAggregationInput[]
    by: PredictionCacheScalarFieldEnum[] | PredictionCacheScalarFieldEnum
    having?: PredictionCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PredictionCacheCountAggregateInputType | true
    _min?: PredictionCacheMinAggregateInputType
    _max?: PredictionCacheMaxAggregateInputType
  }

  export type PredictionCacheGroupByOutputType = {
    id: string
    babyId: string
    kind: string
    inputFingerprint: string
    payload: JsonValue
    modelVersion: string | null
    expiresAt: Date
    createdAt: Date
    _count: PredictionCacheCountAggregateOutputType | null
    _min: PredictionCacheMinAggregateOutputType | null
    _max: PredictionCacheMaxAggregateOutputType | null
  }

  type GetPredictionCacheGroupByPayload<T extends PredictionCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PredictionCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PredictionCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PredictionCacheGroupByOutputType[P]>
            : GetScalarType<T[P], PredictionCacheGroupByOutputType[P]>
        }
      >
    >


  export type PredictionCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    kind?: boolean
    inputFingerprint?: boolean
    payload?: boolean
    modelVersion?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["predictionCache"]>

  export type PredictionCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    kind?: boolean
    inputFingerprint?: boolean
    payload?: boolean
    modelVersion?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["predictionCache"]>

  export type PredictionCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    kind?: boolean
    inputFingerprint?: boolean
    payload?: boolean
    modelVersion?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["predictionCache"]>

  export type PredictionCacheSelectScalar = {
    id?: boolean
    babyId?: boolean
    kind?: boolean
    inputFingerprint?: boolean
    payload?: boolean
    modelVersion?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type PredictionCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "babyId" | "kind" | "inputFingerprint" | "payload" | "modelVersion" | "expiresAt" | "createdAt", ExtArgs["result"]["predictionCache"]>
  export type PredictionCacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type PredictionCacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type PredictionCacheIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }

  export type $PredictionCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PredictionCache"
    objects: {
      baby: Prisma.$BabyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      babyId: string
      kind: string
      inputFingerprint: string
      payload: Prisma.JsonValue
      modelVersion: string | null
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["predictionCache"]>
    composites: {}
  }

  type PredictionCacheGetPayload<S extends boolean | null | undefined | PredictionCacheDefaultArgs> = $Result.GetResult<Prisma.$PredictionCachePayload, S>

  type PredictionCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PredictionCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PredictionCacheCountAggregateInputType | true
    }

  export interface PredictionCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PredictionCache'], meta: { name: 'PredictionCache' } }
    /**
     * Find zero or one PredictionCache that matches the filter.
     * @param {PredictionCacheFindUniqueArgs} args - Arguments to find a PredictionCache
     * @example
     * // Get one PredictionCache
     * const predictionCache = await prisma.predictionCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PredictionCacheFindUniqueArgs>(args: SelectSubset<T, PredictionCacheFindUniqueArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PredictionCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PredictionCacheFindUniqueOrThrowArgs} args - Arguments to find a PredictionCache
     * @example
     * // Get one PredictionCache
     * const predictionCache = await prisma.predictionCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PredictionCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, PredictionCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PredictionCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCacheFindFirstArgs} args - Arguments to find a PredictionCache
     * @example
     * // Get one PredictionCache
     * const predictionCache = await prisma.predictionCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PredictionCacheFindFirstArgs>(args?: SelectSubset<T, PredictionCacheFindFirstArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PredictionCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCacheFindFirstOrThrowArgs} args - Arguments to find a PredictionCache
     * @example
     * // Get one PredictionCache
     * const predictionCache = await prisma.predictionCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PredictionCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, PredictionCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PredictionCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PredictionCaches
     * const predictionCaches = await prisma.predictionCache.findMany()
     * 
     * // Get first 10 PredictionCaches
     * const predictionCaches = await prisma.predictionCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const predictionCacheWithIdOnly = await prisma.predictionCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PredictionCacheFindManyArgs>(args?: SelectSubset<T, PredictionCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PredictionCache.
     * @param {PredictionCacheCreateArgs} args - Arguments to create a PredictionCache.
     * @example
     * // Create one PredictionCache
     * const PredictionCache = await prisma.predictionCache.create({
     *   data: {
     *     // ... data to create a PredictionCache
     *   }
     * })
     * 
     */
    create<T extends PredictionCacheCreateArgs>(args: SelectSubset<T, PredictionCacheCreateArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PredictionCaches.
     * @param {PredictionCacheCreateManyArgs} args - Arguments to create many PredictionCaches.
     * @example
     * // Create many PredictionCaches
     * const predictionCache = await prisma.predictionCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PredictionCacheCreateManyArgs>(args?: SelectSubset<T, PredictionCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PredictionCaches and returns the data saved in the database.
     * @param {PredictionCacheCreateManyAndReturnArgs} args - Arguments to create many PredictionCaches.
     * @example
     * // Create many PredictionCaches
     * const predictionCache = await prisma.predictionCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PredictionCaches and only return the `id`
     * const predictionCacheWithIdOnly = await prisma.predictionCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PredictionCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, PredictionCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PredictionCache.
     * @param {PredictionCacheDeleteArgs} args - Arguments to delete one PredictionCache.
     * @example
     * // Delete one PredictionCache
     * const PredictionCache = await prisma.predictionCache.delete({
     *   where: {
     *     // ... filter to delete one PredictionCache
     *   }
     * })
     * 
     */
    delete<T extends PredictionCacheDeleteArgs>(args: SelectSubset<T, PredictionCacheDeleteArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PredictionCache.
     * @param {PredictionCacheUpdateArgs} args - Arguments to update one PredictionCache.
     * @example
     * // Update one PredictionCache
     * const predictionCache = await prisma.predictionCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PredictionCacheUpdateArgs>(args: SelectSubset<T, PredictionCacheUpdateArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PredictionCaches.
     * @param {PredictionCacheDeleteManyArgs} args - Arguments to filter PredictionCaches to delete.
     * @example
     * // Delete a few PredictionCaches
     * const { count } = await prisma.predictionCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PredictionCacheDeleteManyArgs>(args?: SelectSubset<T, PredictionCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PredictionCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PredictionCaches
     * const predictionCache = await prisma.predictionCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PredictionCacheUpdateManyArgs>(args: SelectSubset<T, PredictionCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PredictionCaches and returns the data updated in the database.
     * @param {PredictionCacheUpdateManyAndReturnArgs} args - Arguments to update many PredictionCaches.
     * @example
     * // Update many PredictionCaches
     * const predictionCache = await prisma.predictionCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PredictionCaches and only return the `id`
     * const predictionCacheWithIdOnly = await prisma.predictionCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PredictionCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, PredictionCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PredictionCache.
     * @param {PredictionCacheUpsertArgs} args - Arguments to update or create a PredictionCache.
     * @example
     * // Update or create a PredictionCache
     * const predictionCache = await prisma.predictionCache.upsert({
     *   create: {
     *     // ... data to create a PredictionCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PredictionCache we want to update
     *   }
     * })
     */
    upsert<T extends PredictionCacheUpsertArgs>(args: SelectSubset<T, PredictionCacheUpsertArgs<ExtArgs>>): Prisma__PredictionCacheClient<$Result.GetResult<Prisma.$PredictionCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PredictionCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCacheCountArgs} args - Arguments to filter PredictionCaches to count.
     * @example
     * // Count the number of PredictionCaches
     * const count = await prisma.predictionCache.count({
     *   where: {
     *     // ... the filter for the PredictionCaches we want to count
     *   }
     * })
    **/
    count<T extends PredictionCacheCountArgs>(
      args?: Subset<T, PredictionCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PredictionCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PredictionCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PredictionCacheAggregateArgs>(args: Subset<T, PredictionCacheAggregateArgs>): Prisma.PrismaPromise<GetPredictionCacheAggregateType<T>>

    /**
     * Group by PredictionCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PredictionCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PredictionCacheGroupByArgs['orderBy'] }
        : { orderBy?: PredictionCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PredictionCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictionCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PredictionCache model
   */
  readonly fields: PredictionCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PredictionCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PredictionCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baby<T extends BabyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BabyDefaultArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PredictionCache model
   */
  interface PredictionCacheFieldRefs {
    readonly id: FieldRef<"PredictionCache", 'String'>
    readonly babyId: FieldRef<"PredictionCache", 'String'>
    readonly kind: FieldRef<"PredictionCache", 'String'>
    readonly inputFingerprint: FieldRef<"PredictionCache", 'String'>
    readonly payload: FieldRef<"PredictionCache", 'Json'>
    readonly modelVersion: FieldRef<"PredictionCache", 'String'>
    readonly expiresAt: FieldRef<"PredictionCache", 'DateTime'>
    readonly createdAt: FieldRef<"PredictionCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PredictionCache findUnique
   */
  export type PredictionCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * Filter, which PredictionCache to fetch.
     */
    where: PredictionCacheWhereUniqueInput
  }

  /**
   * PredictionCache findUniqueOrThrow
   */
  export type PredictionCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * Filter, which PredictionCache to fetch.
     */
    where: PredictionCacheWhereUniqueInput
  }

  /**
   * PredictionCache findFirst
   */
  export type PredictionCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * Filter, which PredictionCache to fetch.
     */
    where?: PredictionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionCaches to fetch.
     */
    orderBy?: PredictionCacheOrderByWithRelationInput | PredictionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PredictionCaches.
     */
    cursor?: PredictionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PredictionCaches.
     */
    distinct?: PredictionCacheScalarFieldEnum | PredictionCacheScalarFieldEnum[]
  }

  /**
   * PredictionCache findFirstOrThrow
   */
  export type PredictionCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * Filter, which PredictionCache to fetch.
     */
    where?: PredictionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionCaches to fetch.
     */
    orderBy?: PredictionCacheOrderByWithRelationInput | PredictionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PredictionCaches.
     */
    cursor?: PredictionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PredictionCaches.
     */
    distinct?: PredictionCacheScalarFieldEnum | PredictionCacheScalarFieldEnum[]
  }

  /**
   * PredictionCache findMany
   */
  export type PredictionCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * Filter, which PredictionCaches to fetch.
     */
    where?: PredictionCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionCaches to fetch.
     */
    orderBy?: PredictionCacheOrderByWithRelationInput | PredictionCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PredictionCaches.
     */
    cursor?: PredictionCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionCaches.
     */
    skip?: number
    distinct?: PredictionCacheScalarFieldEnum | PredictionCacheScalarFieldEnum[]
  }

  /**
   * PredictionCache create
   */
  export type PredictionCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * The data needed to create a PredictionCache.
     */
    data: XOR<PredictionCacheCreateInput, PredictionCacheUncheckedCreateInput>
  }

  /**
   * PredictionCache createMany
   */
  export type PredictionCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PredictionCaches.
     */
    data: PredictionCacheCreateManyInput | PredictionCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PredictionCache createManyAndReturn
   */
  export type PredictionCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * The data used to create many PredictionCaches.
     */
    data: PredictionCacheCreateManyInput | PredictionCacheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PredictionCache update
   */
  export type PredictionCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * The data needed to update a PredictionCache.
     */
    data: XOR<PredictionCacheUpdateInput, PredictionCacheUncheckedUpdateInput>
    /**
     * Choose, which PredictionCache to update.
     */
    where: PredictionCacheWhereUniqueInput
  }

  /**
   * PredictionCache updateMany
   */
  export type PredictionCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PredictionCaches.
     */
    data: XOR<PredictionCacheUpdateManyMutationInput, PredictionCacheUncheckedUpdateManyInput>
    /**
     * Filter which PredictionCaches to update
     */
    where?: PredictionCacheWhereInput
    /**
     * Limit how many PredictionCaches to update.
     */
    limit?: number
  }

  /**
   * PredictionCache updateManyAndReturn
   */
  export type PredictionCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * The data used to update PredictionCaches.
     */
    data: XOR<PredictionCacheUpdateManyMutationInput, PredictionCacheUncheckedUpdateManyInput>
    /**
     * Filter which PredictionCaches to update
     */
    where?: PredictionCacheWhereInput
    /**
     * Limit how many PredictionCaches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PredictionCache upsert
   */
  export type PredictionCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * The filter to search for the PredictionCache to update in case it exists.
     */
    where: PredictionCacheWhereUniqueInput
    /**
     * In case the PredictionCache found by the `where` argument doesn't exist, create a new PredictionCache with this data.
     */
    create: XOR<PredictionCacheCreateInput, PredictionCacheUncheckedCreateInput>
    /**
     * In case the PredictionCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PredictionCacheUpdateInput, PredictionCacheUncheckedUpdateInput>
  }

  /**
   * PredictionCache delete
   */
  export type PredictionCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
    /**
     * Filter which PredictionCache to delete.
     */
    where: PredictionCacheWhereUniqueInput
  }

  /**
   * PredictionCache deleteMany
   */
  export type PredictionCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PredictionCaches to delete
     */
    where?: PredictionCacheWhereInput
    /**
     * Limit how many PredictionCaches to delete.
     */
    limit?: number
  }

  /**
   * PredictionCache without action
   */
  export type PredictionCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCache
     */
    select?: PredictionCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionCache
     */
    omit?: PredictionCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionCacheInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    refresh_token_expires_in: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "refresh_token_expires_in", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      refresh_token_expires_in: number | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly refresh_token_expires_in: FieldRef<"Account", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    isActive: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    isActive: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    passwordHash: number
    isActive: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    isActive?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    isActive?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    isActive?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    isActive: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    isActive?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    householdMemberships?: boolean | User$householdMembershipsArgs<ExtArgs>
    invitesSent?: boolean | User$invitesSentArgs<ExtArgs>
    invitesAccepted?: boolean | User$invitesAcceptedArgs<ExtArgs>
    feedingEventsLogged?: boolean | User$feedingEventsLoggedArgs<ExtArgs>
    consultationsRecorded?: boolean | User$consultationsRecordedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    isActive?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "passwordHash" | "isActive", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    householdMemberships?: boolean | User$householdMembershipsArgs<ExtArgs>
    invitesSent?: boolean | User$invitesSentArgs<ExtArgs>
    invitesAccepted?: boolean | User$invitesAcceptedArgs<ExtArgs>
    feedingEventsLogged?: boolean | User$feedingEventsLoggedArgs<ExtArgs>
    consultationsRecorded?: boolean | User$consultationsRecordedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      householdMemberships: Prisma.$HouseholdMembershipPayload<ExtArgs>[]
      invitesSent: Prisma.$CaregiverInvitePayload<ExtArgs>[]
      invitesAccepted: Prisma.$CaregiverInvitePayload<ExtArgs>[]
      feedingEventsLogged: Prisma.$FeedingEventPayload<ExtArgs>[]
      consultationsRecorded: Prisma.$ConsultationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      passwordHash: string | null
      isActive: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    householdMemberships<T extends User$householdMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$householdMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitesSent<T extends User$invitesSentArgs<ExtArgs> = {}>(args?: Subset<T, User$invitesSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitesAccepted<T extends User$invitesAcceptedArgs<ExtArgs> = {}>(args?: Subset<T, User$invitesAcceptedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaregiverInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedingEventsLogged<T extends User$feedingEventsLoggedArgs<ExtArgs> = {}>(args?: Subset<T, User$feedingEventsLoggedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consultationsRecorded<T extends User$consultationsRecordedArgs<ExtArgs> = {}>(args?: Subset<T, User$consultationsRecordedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.householdMemberships
   */
  export type User$householdMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMembership
     */
    select?: HouseholdMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMembership
     */
    omit?: HouseholdMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMembershipInclude<ExtArgs> | null
    where?: HouseholdMembershipWhereInput
    orderBy?: HouseholdMembershipOrderByWithRelationInput | HouseholdMembershipOrderByWithRelationInput[]
    cursor?: HouseholdMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HouseholdMembershipScalarFieldEnum | HouseholdMembershipScalarFieldEnum[]
  }

  /**
   * User.invitesSent
   */
  export type User$invitesSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    where?: CaregiverInviteWhereInput
    orderBy?: CaregiverInviteOrderByWithRelationInput | CaregiverInviteOrderByWithRelationInput[]
    cursor?: CaregiverInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaregiverInviteScalarFieldEnum | CaregiverInviteScalarFieldEnum[]
  }

  /**
   * User.invitesAccepted
   */
  export type User$invitesAcceptedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaregiverInvite
     */
    select?: CaregiverInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaregiverInvite
     */
    omit?: CaregiverInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaregiverInviteInclude<ExtArgs> | null
    where?: CaregiverInviteWhereInput
    orderBy?: CaregiverInviteOrderByWithRelationInput | CaregiverInviteOrderByWithRelationInput[]
    cursor?: CaregiverInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaregiverInviteScalarFieldEnum | CaregiverInviteScalarFieldEnum[]
  }

  /**
   * User.feedingEventsLogged
   */
  export type User$feedingEventsLoggedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedingEvent
     */
    select?: FeedingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedingEvent
     */
    omit?: FeedingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedingEventInclude<ExtArgs> | null
    where?: FeedingEventWhereInput
    orderBy?: FeedingEventOrderByWithRelationInput | FeedingEventOrderByWithRelationInput[]
    cursor?: FeedingEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedingEventScalarFieldEnum | FeedingEventScalarFieldEnum[]
  }

  /**
   * User.consultationsRecorded
   */
  export type User$consultationsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const HouseholdScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HouseholdScalarFieldEnum = (typeof HouseholdScalarFieldEnum)[keyof typeof HouseholdScalarFieldEnum]


  export const HouseholdMembershipScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    householdId: 'householdId',
    role: 'role',
    displayLabel: 'displayLabel',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HouseholdMembershipScalarFieldEnum = (typeof HouseholdMembershipScalarFieldEnum)[keyof typeof HouseholdMembershipScalarFieldEnum]


  export const CaregiverInviteScalarFieldEnum: {
    id: 'id',
    householdId: 'householdId',
    emailNormalized: 'emailNormalized',
    token: 'token',
    invitedByUserId: 'invitedByUserId',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    acceptedAt: 'acceptedAt',
    acceptedByUserId: 'acceptedByUserId'
  };

  export type CaregiverInviteScalarFieldEnum = (typeof CaregiverInviteScalarFieldEnum)[keyof typeof CaregiverInviteScalarFieldEnum]


  export const BabyScalarFieldEnum: {
    id: 'id',
    householdId: 'householdId',
    displayName: 'displayName',
    birthDateTime: 'birthDateTime',
    birthWeightGrams: 'birthWeightGrams',
    birthLengthCm: 'birthLengthCm',
    headCircumferenceCm: 'headCircumferenceCm',
    sex: 'sex',
    notes: 'notes',
    timezone: 'timezone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BabyScalarFieldEnum = (typeof BabyScalarFieldEnum)[keyof typeof BabyScalarFieldEnum]


  export const FeedingEventScalarFieldEnum: {
    id: 'id',
    babyId: 'babyId',
    loggedByUserId: 'loggedByUserId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    amountMl: 'amountMl',
    milkType: 'milkType',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeedingEventScalarFieldEnum = (typeof FeedingEventScalarFieldEnum)[keyof typeof FeedingEventScalarFieldEnum]


  export const ConsultationScalarFieldEnum: {
    id: 'id',
    babyId: 'babyId',
    recordedById: 'recordedById',
    occurredAt: 'occurredAt',
    location: 'location',
    reason: 'reason',
    outcomeNotes: 'outcomeNotes',
    providerName: 'providerName',
    followUpAt: 'followUpAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    babyId: 'babyId',
    title: 'title',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    location: 'location',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const PredictionCacheScalarFieldEnum: {
    id: 'id',
    babyId: 'babyId',
    kind: 'kind',
    inputFingerprint: 'inputFingerprint',
    payload: 'payload',
    modelVersion: 'modelVersion',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type PredictionCacheScalarFieldEnum = (typeof PredictionCacheScalarFieldEnum)[keyof typeof PredictionCacheScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    refresh_token_expires_in: 'refresh_token_expires_in'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    passwordHash: 'passwordHash',
    isActive: 'isActive'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'HouseholdRole'
   */
  export type EnumHouseholdRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HouseholdRole'>
    


  /**
   * Reference to a field of type 'HouseholdRole[]'
   */
  export type ListEnumHouseholdRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HouseholdRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BabySex'
   */
  export type EnumBabySexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BabySex'>
    


  /**
   * Reference to a field of type 'BabySex[]'
   */
  export type ListEnumBabySexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BabySex[]'>
    


  /**
   * Reference to a field of type 'MilkType'
   */
  export type EnumMilkTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MilkType'>
    


  /**
   * Reference to a field of type 'MilkType[]'
   */
  export type ListEnumMilkTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MilkType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type HouseholdWhereInput = {
    AND?: HouseholdWhereInput | HouseholdWhereInput[]
    OR?: HouseholdWhereInput[]
    NOT?: HouseholdWhereInput | HouseholdWhereInput[]
    id?: StringFilter<"Household"> | string
    name?: StringNullableFilter<"Household"> | string | null
    createdAt?: DateTimeFilter<"Household"> | Date | string
    updatedAt?: DateTimeFilter<"Household"> | Date | string
    memberships?: HouseholdMembershipListRelationFilter
    babies?: BabyListRelationFilter
    invites?: CaregiverInviteListRelationFilter
  }

  export type HouseholdOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberships?: HouseholdMembershipOrderByRelationAggregateInput
    babies?: BabyOrderByRelationAggregateInput
    invites?: CaregiverInviteOrderByRelationAggregateInput
  }

  export type HouseholdWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HouseholdWhereInput | HouseholdWhereInput[]
    OR?: HouseholdWhereInput[]
    NOT?: HouseholdWhereInput | HouseholdWhereInput[]
    name?: StringNullableFilter<"Household"> | string | null
    createdAt?: DateTimeFilter<"Household"> | Date | string
    updatedAt?: DateTimeFilter<"Household"> | Date | string
    memberships?: HouseholdMembershipListRelationFilter
    babies?: BabyListRelationFilter
    invites?: CaregiverInviteListRelationFilter
  }, "id">

  export type HouseholdOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HouseholdCountOrderByAggregateInput
    _max?: HouseholdMaxOrderByAggregateInput
    _min?: HouseholdMinOrderByAggregateInput
  }

  export type HouseholdScalarWhereWithAggregatesInput = {
    AND?: HouseholdScalarWhereWithAggregatesInput | HouseholdScalarWhereWithAggregatesInput[]
    OR?: HouseholdScalarWhereWithAggregatesInput[]
    NOT?: HouseholdScalarWhereWithAggregatesInput | HouseholdScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Household"> | string
    name?: StringNullableWithAggregatesFilter<"Household"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Household"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Household"> | Date | string
  }

  export type HouseholdMembershipWhereInput = {
    AND?: HouseholdMembershipWhereInput | HouseholdMembershipWhereInput[]
    OR?: HouseholdMembershipWhereInput[]
    NOT?: HouseholdMembershipWhereInput | HouseholdMembershipWhereInput[]
    id?: StringFilter<"HouseholdMembership"> | string
    userId?: StringFilter<"HouseholdMembership"> | string
    householdId?: StringFilter<"HouseholdMembership"> | string
    role?: EnumHouseholdRoleFilter<"HouseholdMembership"> | $Enums.HouseholdRole
    displayLabel?: StringNullableFilter<"HouseholdMembership"> | string | null
    createdAt?: DateTimeFilter<"HouseholdMembership"> | Date | string
    updatedAt?: DateTimeFilter<"HouseholdMembership"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
  }

  export type HouseholdMembershipOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    householdId?: SortOrder
    role?: SortOrder
    displayLabel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    household?: HouseholdOrderByWithRelationInput
  }

  export type HouseholdMembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_householdId?: HouseholdMembershipUserIdHouseholdIdCompoundUniqueInput
    AND?: HouseholdMembershipWhereInput | HouseholdMembershipWhereInput[]
    OR?: HouseholdMembershipWhereInput[]
    NOT?: HouseholdMembershipWhereInput | HouseholdMembershipWhereInput[]
    userId?: StringFilter<"HouseholdMembership"> | string
    householdId?: StringFilter<"HouseholdMembership"> | string
    role?: EnumHouseholdRoleFilter<"HouseholdMembership"> | $Enums.HouseholdRole
    displayLabel?: StringNullableFilter<"HouseholdMembership"> | string | null
    createdAt?: DateTimeFilter<"HouseholdMembership"> | Date | string
    updatedAt?: DateTimeFilter<"HouseholdMembership"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
  }, "id" | "userId_householdId">

  export type HouseholdMembershipOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    householdId?: SortOrder
    role?: SortOrder
    displayLabel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HouseholdMembershipCountOrderByAggregateInput
    _max?: HouseholdMembershipMaxOrderByAggregateInput
    _min?: HouseholdMembershipMinOrderByAggregateInput
  }

  export type HouseholdMembershipScalarWhereWithAggregatesInput = {
    AND?: HouseholdMembershipScalarWhereWithAggregatesInput | HouseholdMembershipScalarWhereWithAggregatesInput[]
    OR?: HouseholdMembershipScalarWhereWithAggregatesInput[]
    NOT?: HouseholdMembershipScalarWhereWithAggregatesInput | HouseholdMembershipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HouseholdMembership"> | string
    userId?: StringWithAggregatesFilter<"HouseholdMembership"> | string
    householdId?: StringWithAggregatesFilter<"HouseholdMembership"> | string
    role?: EnumHouseholdRoleWithAggregatesFilter<"HouseholdMembership"> | $Enums.HouseholdRole
    displayLabel?: StringNullableWithAggregatesFilter<"HouseholdMembership"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HouseholdMembership"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HouseholdMembership"> | Date | string
  }

  export type CaregiverInviteWhereInput = {
    AND?: CaregiverInviteWhereInput | CaregiverInviteWhereInput[]
    OR?: CaregiverInviteWhereInput[]
    NOT?: CaregiverInviteWhereInput | CaregiverInviteWhereInput[]
    id?: StringFilter<"CaregiverInvite"> | string
    householdId?: StringFilter<"CaregiverInvite"> | string
    emailNormalized?: StringFilter<"CaregiverInvite"> | string
    token?: StringFilter<"CaregiverInvite"> | string
    invitedByUserId?: StringFilter<"CaregiverInvite"> | string
    expiresAt?: DateTimeFilter<"CaregiverInvite"> | Date | string
    revokedAt?: DateTimeNullableFilter<"CaregiverInvite"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"CaregiverInvite"> | Date | string | null
    acceptedByUserId?: StringNullableFilter<"CaregiverInvite"> | string | null
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    invitedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CaregiverInviteOrderByWithRelationInput = {
    id?: SortOrder
    householdId?: SortOrder
    emailNormalized?: SortOrder
    token?: SortOrder
    invitedByUserId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    acceptedByUserId?: SortOrderInput | SortOrder
    household?: HouseholdOrderByWithRelationInput
    invitedBy?: UserOrderByWithRelationInput
    acceptedBy?: UserOrderByWithRelationInput
  }

  export type CaregiverInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: CaregiverInviteWhereInput | CaregiverInviteWhereInput[]
    OR?: CaregiverInviteWhereInput[]
    NOT?: CaregiverInviteWhereInput | CaregiverInviteWhereInput[]
    householdId?: StringFilter<"CaregiverInvite"> | string
    emailNormalized?: StringFilter<"CaregiverInvite"> | string
    invitedByUserId?: StringFilter<"CaregiverInvite"> | string
    expiresAt?: DateTimeFilter<"CaregiverInvite"> | Date | string
    revokedAt?: DateTimeNullableFilter<"CaregiverInvite"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"CaregiverInvite"> | Date | string | null
    acceptedByUserId?: StringNullableFilter<"CaregiverInvite"> | string | null
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    invitedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "token">

  export type CaregiverInviteOrderByWithAggregationInput = {
    id?: SortOrder
    householdId?: SortOrder
    emailNormalized?: SortOrder
    token?: SortOrder
    invitedByUserId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    acceptedByUserId?: SortOrderInput | SortOrder
    _count?: CaregiverInviteCountOrderByAggregateInput
    _max?: CaregiverInviteMaxOrderByAggregateInput
    _min?: CaregiverInviteMinOrderByAggregateInput
  }

  export type CaregiverInviteScalarWhereWithAggregatesInput = {
    AND?: CaregiverInviteScalarWhereWithAggregatesInput | CaregiverInviteScalarWhereWithAggregatesInput[]
    OR?: CaregiverInviteScalarWhereWithAggregatesInput[]
    NOT?: CaregiverInviteScalarWhereWithAggregatesInput | CaregiverInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaregiverInvite"> | string
    householdId?: StringWithAggregatesFilter<"CaregiverInvite"> | string
    emailNormalized?: StringWithAggregatesFilter<"CaregiverInvite"> | string
    token?: StringWithAggregatesFilter<"CaregiverInvite"> | string
    invitedByUserId?: StringWithAggregatesFilter<"CaregiverInvite"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"CaregiverInvite"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"CaregiverInvite"> | Date | string | null
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"CaregiverInvite"> | Date | string | null
    acceptedByUserId?: StringNullableWithAggregatesFilter<"CaregiverInvite"> | string | null
  }

  export type BabyWhereInput = {
    AND?: BabyWhereInput | BabyWhereInput[]
    OR?: BabyWhereInput[]
    NOT?: BabyWhereInput | BabyWhereInput[]
    id?: StringFilter<"Baby"> | string
    householdId?: StringFilter<"Baby"> | string
    displayName?: StringFilter<"Baby"> | string
    birthDateTime?: DateTimeFilter<"Baby"> | Date | string
    birthWeightGrams?: IntNullableFilter<"Baby"> | number | null
    birthLengthCm?: IntNullableFilter<"Baby"> | number | null
    headCircumferenceCm?: IntNullableFilter<"Baby"> | number | null
    sex?: EnumBabySexFilter<"Baby"> | $Enums.BabySex
    notes?: StringNullableFilter<"Baby"> | string | null
    timezone?: StringFilter<"Baby"> | string
    createdAt?: DateTimeFilter<"Baby"> | Date | string
    updatedAt?: DateTimeFilter<"Baby"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    feedingEvents?: FeedingEventListRelationFilter
    consultations?: ConsultationListRelationFilter
    appointments?: AppointmentListRelationFilter
    predictionCaches?: PredictionCacheListRelationFilter
  }

  export type BabyOrderByWithRelationInput = {
    id?: SortOrder
    householdId?: SortOrder
    displayName?: SortOrder
    birthDateTime?: SortOrder
    birthWeightGrams?: SortOrderInput | SortOrder
    birthLengthCm?: SortOrderInput | SortOrder
    headCircumferenceCm?: SortOrderInput | SortOrder
    sex?: SortOrder
    notes?: SortOrderInput | SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    household?: HouseholdOrderByWithRelationInput
    feedingEvents?: FeedingEventOrderByRelationAggregateInput
    consultations?: ConsultationOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    predictionCaches?: PredictionCacheOrderByRelationAggregateInput
  }

  export type BabyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BabyWhereInput | BabyWhereInput[]
    OR?: BabyWhereInput[]
    NOT?: BabyWhereInput | BabyWhereInput[]
    householdId?: StringFilter<"Baby"> | string
    displayName?: StringFilter<"Baby"> | string
    birthDateTime?: DateTimeFilter<"Baby"> | Date | string
    birthWeightGrams?: IntNullableFilter<"Baby"> | number | null
    birthLengthCm?: IntNullableFilter<"Baby"> | number | null
    headCircumferenceCm?: IntNullableFilter<"Baby"> | number | null
    sex?: EnumBabySexFilter<"Baby"> | $Enums.BabySex
    notes?: StringNullableFilter<"Baby"> | string | null
    timezone?: StringFilter<"Baby"> | string
    createdAt?: DateTimeFilter<"Baby"> | Date | string
    updatedAt?: DateTimeFilter<"Baby"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    feedingEvents?: FeedingEventListRelationFilter
    consultations?: ConsultationListRelationFilter
    appointments?: AppointmentListRelationFilter
    predictionCaches?: PredictionCacheListRelationFilter
  }, "id">

  export type BabyOrderByWithAggregationInput = {
    id?: SortOrder
    householdId?: SortOrder
    displayName?: SortOrder
    birthDateTime?: SortOrder
    birthWeightGrams?: SortOrderInput | SortOrder
    birthLengthCm?: SortOrderInput | SortOrder
    headCircumferenceCm?: SortOrderInput | SortOrder
    sex?: SortOrder
    notes?: SortOrderInput | SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BabyCountOrderByAggregateInput
    _avg?: BabyAvgOrderByAggregateInput
    _max?: BabyMaxOrderByAggregateInput
    _min?: BabyMinOrderByAggregateInput
    _sum?: BabySumOrderByAggregateInput
  }

  export type BabyScalarWhereWithAggregatesInput = {
    AND?: BabyScalarWhereWithAggregatesInput | BabyScalarWhereWithAggregatesInput[]
    OR?: BabyScalarWhereWithAggregatesInput[]
    NOT?: BabyScalarWhereWithAggregatesInput | BabyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Baby"> | string
    householdId?: StringWithAggregatesFilter<"Baby"> | string
    displayName?: StringWithAggregatesFilter<"Baby"> | string
    birthDateTime?: DateTimeWithAggregatesFilter<"Baby"> | Date | string
    birthWeightGrams?: IntNullableWithAggregatesFilter<"Baby"> | number | null
    birthLengthCm?: IntNullableWithAggregatesFilter<"Baby"> | number | null
    headCircumferenceCm?: IntNullableWithAggregatesFilter<"Baby"> | number | null
    sex?: EnumBabySexWithAggregatesFilter<"Baby"> | $Enums.BabySex
    notes?: StringNullableWithAggregatesFilter<"Baby"> | string | null
    timezone?: StringWithAggregatesFilter<"Baby"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Baby"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Baby"> | Date | string
  }

  export type FeedingEventWhereInput = {
    AND?: FeedingEventWhereInput | FeedingEventWhereInput[]
    OR?: FeedingEventWhereInput[]
    NOT?: FeedingEventWhereInput | FeedingEventWhereInput[]
    id?: StringFilter<"FeedingEvent"> | string
    babyId?: StringFilter<"FeedingEvent"> | string
    loggedByUserId?: StringFilter<"FeedingEvent"> | string
    startedAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    endedAt?: DateTimeNullableFilter<"FeedingEvent"> | Date | string | null
    amountMl?: IntFilter<"FeedingEvent"> | number
    milkType?: EnumMilkTypeFilter<"FeedingEvent"> | $Enums.MilkType
    notes?: StringNullableFilter<"FeedingEvent"> | string | null
    createdAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    updatedAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
    loggedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FeedingEventOrderByWithRelationInput = {
    id?: SortOrder
    babyId?: SortOrder
    loggedByUserId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    amountMl?: SortOrder
    milkType?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baby?: BabyOrderByWithRelationInput
    loggedBy?: UserOrderByWithRelationInput
  }

  export type FeedingEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedingEventWhereInput | FeedingEventWhereInput[]
    OR?: FeedingEventWhereInput[]
    NOT?: FeedingEventWhereInput | FeedingEventWhereInput[]
    babyId?: StringFilter<"FeedingEvent"> | string
    loggedByUserId?: StringFilter<"FeedingEvent"> | string
    startedAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    endedAt?: DateTimeNullableFilter<"FeedingEvent"> | Date | string | null
    amountMl?: IntFilter<"FeedingEvent"> | number
    milkType?: EnumMilkTypeFilter<"FeedingEvent"> | $Enums.MilkType
    notes?: StringNullableFilter<"FeedingEvent"> | string | null
    createdAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    updatedAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
    loggedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FeedingEventOrderByWithAggregationInput = {
    id?: SortOrder
    babyId?: SortOrder
    loggedByUserId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    amountMl?: SortOrder
    milkType?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeedingEventCountOrderByAggregateInput
    _avg?: FeedingEventAvgOrderByAggregateInput
    _max?: FeedingEventMaxOrderByAggregateInput
    _min?: FeedingEventMinOrderByAggregateInput
    _sum?: FeedingEventSumOrderByAggregateInput
  }

  export type FeedingEventScalarWhereWithAggregatesInput = {
    AND?: FeedingEventScalarWhereWithAggregatesInput | FeedingEventScalarWhereWithAggregatesInput[]
    OR?: FeedingEventScalarWhereWithAggregatesInput[]
    NOT?: FeedingEventScalarWhereWithAggregatesInput | FeedingEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeedingEvent"> | string
    babyId?: StringWithAggregatesFilter<"FeedingEvent"> | string
    loggedByUserId?: StringWithAggregatesFilter<"FeedingEvent"> | string
    startedAt?: DateTimeWithAggregatesFilter<"FeedingEvent"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"FeedingEvent"> | Date | string | null
    amountMl?: IntWithAggregatesFilter<"FeedingEvent"> | number
    milkType?: EnumMilkTypeWithAggregatesFilter<"FeedingEvent"> | $Enums.MilkType
    notes?: StringNullableWithAggregatesFilter<"FeedingEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FeedingEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FeedingEvent"> | Date | string
  }

  export type ConsultationWhereInput = {
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    id?: StringFilter<"Consultation"> | string
    babyId?: StringFilter<"Consultation"> | string
    recordedById?: StringNullableFilter<"Consultation"> | string | null
    occurredAt?: DateTimeFilter<"Consultation"> | Date | string
    location?: StringFilter<"Consultation"> | string
    reason?: StringFilter<"Consultation"> | string
    outcomeNotes?: StringNullableFilter<"Consultation"> | string | null
    providerName?: StringNullableFilter<"Consultation"> | string | null
    followUpAt?: DateTimeNullableFilter<"Consultation"> | Date | string | null
    createdAt?: DateTimeFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeFilter<"Consultation"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
    recordedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ConsultationOrderByWithRelationInput = {
    id?: SortOrder
    babyId?: SortOrder
    recordedById?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    location?: SortOrder
    reason?: SortOrder
    outcomeNotes?: SortOrderInput | SortOrder
    providerName?: SortOrderInput | SortOrder
    followUpAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baby?: BabyOrderByWithRelationInput
    recordedBy?: UserOrderByWithRelationInput
  }

  export type ConsultationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    babyId?: StringFilter<"Consultation"> | string
    recordedById?: StringNullableFilter<"Consultation"> | string | null
    occurredAt?: DateTimeFilter<"Consultation"> | Date | string
    location?: StringFilter<"Consultation"> | string
    reason?: StringFilter<"Consultation"> | string
    outcomeNotes?: StringNullableFilter<"Consultation"> | string | null
    providerName?: StringNullableFilter<"Consultation"> | string | null
    followUpAt?: DateTimeNullableFilter<"Consultation"> | Date | string | null
    createdAt?: DateTimeFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeFilter<"Consultation"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
    recordedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ConsultationOrderByWithAggregationInput = {
    id?: SortOrder
    babyId?: SortOrder
    recordedById?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    location?: SortOrder
    reason?: SortOrder
    outcomeNotes?: SortOrderInput | SortOrder
    providerName?: SortOrderInput | SortOrder
    followUpAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConsultationCountOrderByAggregateInput
    _max?: ConsultationMaxOrderByAggregateInput
    _min?: ConsultationMinOrderByAggregateInput
  }

  export type ConsultationScalarWhereWithAggregatesInput = {
    AND?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    OR?: ConsultationScalarWhereWithAggregatesInput[]
    NOT?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Consultation"> | string
    babyId?: StringWithAggregatesFilter<"Consultation"> | string
    recordedById?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    occurredAt?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    location?: StringWithAggregatesFilter<"Consultation"> | string
    reason?: StringWithAggregatesFilter<"Consultation"> | string
    outcomeNotes?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    providerName?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    followUpAt?: DateTimeNullableWithAggregatesFilter<"Consultation"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    babyId?: StringFilter<"Appointment"> | string
    title?: StringFilter<"Appointment"> | string
    startsAt?: DateTimeFilter<"Appointment"> | Date | string
    endsAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    location?: StringNullableFilter<"Appointment"> | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    babyId?: SortOrder
    title?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baby?: BabyOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    babyId?: StringFilter<"Appointment"> | string
    title?: StringFilter<"Appointment"> | string
    startsAt?: DateTimeFilter<"Appointment"> | Date | string
    endsAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    location?: StringNullableFilter<"Appointment"> | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    babyId?: SortOrder
    title?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    babyId?: StringWithAggregatesFilter<"Appointment"> | string
    title?: StringWithAggregatesFilter<"Appointment"> | string
    startsAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    endsAt?: DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null
    location?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type PredictionCacheWhereInput = {
    AND?: PredictionCacheWhereInput | PredictionCacheWhereInput[]
    OR?: PredictionCacheWhereInput[]
    NOT?: PredictionCacheWhereInput | PredictionCacheWhereInput[]
    id?: StringFilter<"PredictionCache"> | string
    babyId?: StringFilter<"PredictionCache"> | string
    kind?: StringFilter<"PredictionCache"> | string
    inputFingerprint?: StringFilter<"PredictionCache"> | string
    payload?: JsonFilter<"PredictionCache">
    modelVersion?: StringNullableFilter<"PredictionCache"> | string | null
    expiresAt?: DateTimeFilter<"PredictionCache"> | Date | string
    createdAt?: DateTimeFilter<"PredictionCache"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }

  export type PredictionCacheOrderByWithRelationInput = {
    id?: SortOrder
    babyId?: SortOrder
    kind?: SortOrder
    inputFingerprint?: SortOrder
    payload?: SortOrder
    modelVersion?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    baby?: BabyOrderByWithRelationInput
  }

  export type PredictionCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PredictionCacheWhereInput | PredictionCacheWhereInput[]
    OR?: PredictionCacheWhereInput[]
    NOT?: PredictionCacheWhereInput | PredictionCacheWhereInput[]
    babyId?: StringFilter<"PredictionCache"> | string
    kind?: StringFilter<"PredictionCache"> | string
    inputFingerprint?: StringFilter<"PredictionCache"> | string
    payload?: JsonFilter<"PredictionCache">
    modelVersion?: StringNullableFilter<"PredictionCache"> | string | null
    expiresAt?: DateTimeFilter<"PredictionCache"> | Date | string
    createdAt?: DateTimeFilter<"PredictionCache"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }, "id">

  export type PredictionCacheOrderByWithAggregationInput = {
    id?: SortOrder
    babyId?: SortOrder
    kind?: SortOrder
    inputFingerprint?: SortOrder
    payload?: SortOrder
    modelVersion?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: PredictionCacheCountOrderByAggregateInput
    _max?: PredictionCacheMaxOrderByAggregateInput
    _min?: PredictionCacheMinOrderByAggregateInput
  }

  export type PredictionCacheScalarWhereWithAggregatesInput = {
    AND?: PredictionCacheScalarWhereWithAggregatesInput | PredictionCacheScalarWhereWithAggregatesInput[]
    OR?: PredictionCacheScalarWhereWithAggregatesInput[]
    NOT?: PredictionCacheScalarWhereWithAggregatesInput | PredictionCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PredictionCache"> | string
    babyId?: StringWithAggregatesFilter<"PredictionCache"> | string
    kind?: StringWithAggregatesFilter<"PredictionCache"> | string
    inputFingerprint?: StringWithAggregatesFilter<"PredictionCache"> | string
    payload?: JsonWithAggregatesFilter<"PredictionCache">
    modelVersion?: StringNullableWithAggregatesFilter<"PredictionCache"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"PredictionCache"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PredictionCache"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableWithAggregatesFilter<"Account"> | number | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    householdMemberships?: HouseholdMembershipListRelationFilter
    invitesSent?: CaregiverInviteListRelationFilter
    invitesAccepted?: CaregiverInviteListRelationFilter
    feedingEventsLogged?: FeedingEventListRelationFilter
    consultationsRecorded?: ConsultationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    isActive?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    householdMemberships?: HouseholdMembershipOrderByRelationAggregateInput
    invitesSent?: CaregiverInviteOrderByRelationAggregateInput
    invitesAccepted?: CaregiverInviteOrderByRelationAggregateInput
    feedingEventsLogged?: FeedingEventOrderByRelationAggregateInput
    consultationsRecorded?: ConsultationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    householdMemberships?: HouseholdMembershipListRelationFilter
    invitesSent?: CaregiverInviteListRelationFilter
    invitesAccepted?: CaregiverInviteListRelationFilter
    feedingEventsLogged?: FeedingEventListRelationFilter
    consultationsRecorded?: ConsultationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type HouseholdCreateInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: HouseholdMembershipCreateNestedManyWithoutHouseholdInput
    babies?: BabyCreateNestedManyWithoutHouseholdInput
    invites?: CaregiverInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutHouseholdInput
    babies?: BabyUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: CaregiverInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMembershipUpdateManyWithoutHouseholdNestedInput
    babies?: BabyUpdateManyWithoutHouseholdNestedInput
    invites?: CaregiverInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMembershipUncheckedUpdateManyWithoutHouseholdNestedInput
    babies?: BabyUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: CaregiverInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdCreateManyInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HouseholdUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMembershipCreateInput = {
    id?: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHouseholdMembershipsInput
    household: HouseholdCreateNestedOneWithoutMembershipsInput
  }

  export type HouseholdMembershipUncheckedCreateInput = {
    id?: string
    userId: string
    householdId: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HouseholdMembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHouseholdMembershipsNestedInput
    household?: HouseholdUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type HouseholdMembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMembershipCreateManyInput = {
    id?: string
    userId: string
    householdId: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HouseholdMembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaregiverInviteCreateInput = {
    id?: string
    emailNormalized: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    household: HouseholdCreateNestedOneWithoutInvitesInput
    invitedBy: UserCreateNestedOneWithoutInvitesSentInput
    acceptedBy?: UserCreateNestedOneWithoutInvitesAcceptedInput
  }

  export type CaregiverInviteUncheckedCreateInput = {
    id?: string
    householdId: string
    emailNormalized: string
    token: string
    invitedByUserId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    acceptedByUserId?: string | null
  }

  export type CaregiverInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    household?: HouseholdUpdateOneRequiredWithoutInvitesNestedInput
    invitedBy?: UserUpdateOneRequiredWithoutInvitesSentNestedInput
    acceptedBy?: UserUpdateOneWithoutInvitesAcceptedNestedInput
  }

  export type CaregiverInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    invitedByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CaregiverInviteCreateManyInput = {
    id?: string
    householdId: string
    emailNormalized: string
    token: string
    invitedByUserId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    acceptedByUserId?: string | null
  }

  export type CaregiverInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaregiverInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    invitedByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BabyCreateInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutBabiesInput
    feedingEvents?: FeedingEventCreateNestedManyWithoutBabyInput
    consultations?: ConsultationCreateNestedManyWithoutBabyInput
    appointments?: AppointmentCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateInput = {
    id?: string
    householdId: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedingEvents?: FeedingEventUncheckedCreateNestedManyWithoutBabyInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutBabyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutBabiesNestedInput
    feedingEvents?: FeedingEventUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedingEvents?: FeedingEventUncheckedUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type BabyCreateManyInput = {
    id?: string
    householdId: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BabyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BabyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedingEventCreateInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutFeedingEventsInput
    loggedBy: UserCreateNestedOneWithoutFeedingEventsLoggedInput
  }

  export type FeedingEventUncheckedCreateInput = {
    id?: string
    babyId: string
    loggedByUserId: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedingEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutFeedingEventsNestedInput
    loggedBy?: UserUpdateOneRequiredWithoutFeedingEventsLoggedNestedInput
  }

  export type FeedingEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    loggedByUserId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedingEventCreateManyInput = {
    id?: string
    babyId: string
    loggedByUserId: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedingEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedingEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    loggedByUserId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateInput = {
    id?: string
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutConsultationsInput
    recordedBy?: UserCreateNestedOneWithoutConsultationsRecordedInput
  }

  export type ConsultationUncheckedCreateInput = {
    id?: string
    babyId: string
    recordedById?: string | null
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutConsultationsNestedInput
    recordedBy?: UserUpdateOneWithoutConsultationsRecordedNestedInput
  }

  export type ConsultationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateManyInput = {
    id?: string
    babyId: string
    recordedById?: string | null
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    title: string
    startsAt: Date | string
    endsAt?: Date | string | null
    location?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    babyId: string
    title: string
    startsAt: Date | string
    endsAt?: Date | string | null
    location?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    babyId: string
    title: string
    startsAt: Date | string
    endsAt?: Date | string | null
    location?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionCacheCreateInput = {
    id?: string
    kind: string
    inputFingerprint: string
    payload: JsonNullValueInput | InputJsonValue
    modelVersion?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
    baby: BabyCreateNestedOneWithoutPredictionCachesInput
  }

  export type PredictionCacheUncheckedCreateInput = {
    id?: string
    babyId: string
    kind: string
    inputFingerprint: string
    payload: JsonNullValueInput | InputJsonValue
    modelVersion?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PredictionCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    inputFingerprint?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    modelVersion?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutPredictionCachesNestedInput
  }

  export type PredictionCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    inputFingerprint?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    modelVersion?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionCacheCreateManyInput = {
    id?: string
    babyId: string
    kind: string
    inputFingerprint: string
    payload: JsonNullValueInput | InputJsonValue
    modelVersion?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PredictionCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    inputFingerprint?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    modelVersion?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    inputFingerprint?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    modelVersion?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type HouseholdMembershipListRelationFilter = {
    every?: HouseholdMembershipWhereInput
    some?: HouseholdMembershipWhereInput
    none?: HouseholdMembershipWhereInput
  }

  export type BabyListRelationFilter = {
    every?: BabyWhereInput
    some?: BabyWhereInput
    none?: BabyWhereInput
  }

  export type CaregiverInviteListRelationFilter = {
    every?: CaregiverInviteWhereInput
    some?: CaregiverInviteWhereInput
    none?: CaregiverInviteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HouseholdMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BabyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaregiverInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HouseholdCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HouseholdMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HouseholdMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumHouseholdRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleFilter<$PrismaModel> | $Enums.HouseholdRole
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type HouseholdScalarRelationFilter = {
    is?: HouseholdWhereInput
    isNot?: HouseholdWhereInput
  }

  export type HouseholdMembershipUserIdHouseholdIdCompoundUniqueInput = {
    userId: string
    householdId: string
  }

  export type HouseholdMembershipCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    householdId?: SortOrder
    role?: SortOrder
    displayLabel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HouseholdMembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    householdId?: SortOrder
    role?: SortOrder
    displayLabel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HouseholdMembershipMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    householdId?: SortOrder
    role?: SortOrder
    displayLabel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumHouseholdRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleWithAggregatesFilter<$PrismaModel> | $Enums.HouseholdRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHouseholdRoleFilter<$PrismaModel>
    _max?: NestedEnumHouseholdRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CaregiverInviteCountOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    emailNormalized?: SortOrder
    token?: SortOrder
    invitedByUserId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    acceptedAt?: SortOrder
    acceptedByUserId?: SortOrder
  }

  export type CaregiverInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    emailNormalized?: SortOrder
    token?: SortOrder
    invitedByUserId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    acceptedAt?: SortOrder
    acceptedByUserId?: SortOrder
  }

  export type CaregiverInviteMinOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    emailNormalized?: SortOrder
    token?: SortOrder
    invitedByUserId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    acceptedAt?: SortOrder
    acceptedByUserId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumBabySexFilter<$PrismaModel = never> = {
    equals?: $Enums.BabySex | EnumBabySexFieldRefInput<$PrismaModel>
    in?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    notIn?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    not?: NestedEnumBabySexFilter<$PrismaModel> | $Enums.BabySex
  }

  export type FeedingEventListRelationFilter = {
    every?: FeedingEventWhereInput
    some?: FeedingEventWhereInput
    none?: FeedingEventWhereInput
  }

  export type ConsultationListRelationFilter = {
    every?: ConsultationWhereInput
    some?: ConsultationWhereInput
    none?: ConsultationWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type PredictionCacheListRelationFilter = {
    every?: PredictionCacheWhereInput
    some?: PredictionCacheWhereInput
    none?: PredictionCacheWhereInput
  }

  export type FeedingEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsultationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PredictionCacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BabyCountOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    displayName?: SortOrder
    birthDateTime?: SortOrder
    birthWeightGrams?: SortOrder
    birthLengthCm?: SortOrder
    headCircumferenceCm?: SortOrder
    sex?: SortOrder
    notes?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BabyAvgOrderByAggregateInput = {
    birthWeightGrams?: SortOrder
    birthLengthCm?: SortOrder
    headCircumferenceCm?: SortOrder
  }

  export type BabyMaxOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    displayName?: SortOrder
    birthDateTime?: SortOrder
    birthWeightGrams?: SortOrder
    birthLengthCm?: SortOrder
    headCircumferenceCm?: SortOrder
    sex?: SortOrder
    notes?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BabyMinOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    displayName?: SortOrder
    birthDateTime?: SortOrder
    birthWeightGrams?: SortOrder
    birthLengthCm?: SortOrder
    headCircumferenceCm?: SortOrder
    sex?: SortOrder
    notes?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BabySumOrderByAggregateInput = {
    birthWeightGrams?: SortOrder
    birthLengthCm?: SortOrder
    headCircumferenceCm?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumBabySexWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BabySex | EnumBabySexFieldRefInput<$PrismaModel>
    in?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    notIn?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    not?: NestedEnumBabySexWithAggregatesFilter<$PrismaModel> | $Enums.BabySex
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBabySexFilter<$PrismaModel>
    _max?: NestedEnumBabySexFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumMilkTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MilkType | EnumMilkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMilkTypeFilter<$PrismaModel> | $Enums.MilkType
  }

  export type BabyScalarRelationFilter = {
    is?: BabyWhereInput
    isNot?: BabyWhereInput
  }

  export type FeedingEventCountOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    loggedByUserId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    amountMl?: SortOrder
    milkType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedingEventAvgOrderByAggregateInput = {
    amountMl?: SortOrder
  }

  export type FeedingEventMaxOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    loggedByUserId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    amountMl?: SortOrder
    milkType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedingEventMinOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    loggedByUserId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    amountMl?: SortOrder
    milkType?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedingEventSumOrderByAggregateInput = {
    amountMl?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumMilkTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MilkType | EnumMilkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMilkTypeWithAggregatesFilter<$PrismaModel> | $Enums.MilkType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMilkTypeFilter<$PrismaModel>
    _max?: NestedEnumMilkTypeFilter<$PrismaModel>
  }

  export type ConsultationCountOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    recordedById?: SortOrder
    occurredAt?: SortOrder
    location?: SortOrder
    reason?: SortOrder
    outcomeNotes?: SortOrder
    providerName?: SortOrder
    followUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationMaxOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    recordedById?: SortOrder
    occurredAt?: SortOrder
    location?: SortOrder
    reason?: SortOrder
    outcomeNotes?: SortOrder
    providerName?: SortOrder
    followUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationMinOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    recordedById?: SortOrder
    occurredAt?: SortOrder
    location?: SortOrder
    reason?: SortOrder
    outcomeNotes?: SortOrder
    providerName?: SortOrder
    followUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    title?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    title?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    title?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PredictionCacheCountOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    kind?: SortOrder
    inputFingerprint?: SortOrder
    payload?: SortOrder
    modelVersion?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PredictionCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    kind?: SortOrder
    inputFingerprint?: SortOrder
    modelVersion?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PredictionCacheMinOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    kind?: SortOrder
    inputFingerprint?: SortOrder
    modelVersion?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type HouseholdMembershipCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<HouseholdMembershipCreateWithoutHouseholdInput, HouseholdMembershipUncheckedCreateWithoutHouseholdInput> | HouseholdMembershipCreateWithoutHouseholdInput[] | HouseholdMembershipUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutHouseholdInput | HouseholdMembershipCreateOrConnectWithoutHouseholdInput[]
    createMany?: HouseholdMembershipCreateManyHouseholdInputEnvelope
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
  }

  export type BabyCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<BabyCreateWithoutHouseholdInput, BabyUncheckedCreateWithoutHouseholdInput> | BabyCreateWithoutHouseholdInput[] | BabyUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: BabyCreateOrConnectWithoutHouseholdInput | BabyCreateOrConnectWithoutHouseholdInput[]
    createMany?: BabyCreateManyHouseholdInputEnvelope
    connect?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
  }

  export type CaregiverInviteCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<CaregiverInviteCreateWithoutHouseholdInput, CaregiverInviteUncheckedCreateWithoutHouseholdInput> | CaregiverInviteCreateWithoutHouseholdInput[] | CaregiverInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutHouseholdInput | CaregiverInviteCreateOrConnectWithoutHouseholdInput[]
    createMany?: CaregiverInviteCreateManyHouseholdInputEnvelope
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
  }

  export type HouseholdMembershipUncheckedCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<HouseholdMembershipCreateWithoutHouseholdInput, HouseholdMembershipUncheckedCreateWithoutHouseholdInput> | HouseholdMembershipCreateWithoutHouseholdInput[] | HouseholdMembershipUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutHouseholdInput | HouseholdMembershipCreateOrConnectWithoutHouseholdInput[]
    createMany?: HouseholdMembershipCreateManyHouseholdInputEnvelope
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
  }

  export type BabyUncheckedCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<BabyCreateWithoutHouseholdInput, BabyUncheckedCreateWithoutHouseholdInput> | BabyCreateWithoutHouseholdInput[] | BabyUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: BabyCreateOrConnectWithoutHouseholdInput | BabyCreateOrConnectWithoutHouseholdInput[]
    createMany?: BabyCreateManyHouseholdInputEnvelope
    connect?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
  }

  export type CaregiverInviteUncheckedCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<CaregiverInviteCreateWithoutHouseholdInput, CaregiverInviteUncheckedCreateWithoutHouseholdInput> | CaregiverInviteCreateWithoutHouseholdInput[] | CaregiverInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutHouseholdInput | CaregiverInviteCreateOrConnectWithoutHouseholdInput[]
    createMany?: CaregiverInviteCreateManyHouseholdInputEnvelope
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type HouseholdMembershipUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<HouseholdMembershipCreateWithoutHouseholdInput, HouseholdMembershipUncheckedCreateWithoutHouseholdInput> | HouseholdMembershipCreateWithoutHouseholdInput[] | HouseholdMembershipUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutHouseholdInput | HouseholdMembershipCreateOrConnectWithoutHouseholdInput[]
    upsert?: HouseholdMembershipUpsertWithWhereUniqueWithoutHouseholdInput | HouseholdMembershipUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: HouseholdMembershipCreateManyHouseholdInputEnvelope
    set?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    disconnect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    delete?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    update?: HouseholdMembershipUpdateWithWhereUniqueWithoutHouseholdInput | HouseholdMembershipUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: HouseholdMembershipUpdateManyWithWhereWithoutHouseholdInput | HouseholdMembershipUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: HouseholdMembershipScalarWhereInput | HouseholdMembershipScalarWhereInput[]
  }

  export type BabyUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<BabyCreateWithoutHouseholdInput, BabyUncheckedCreateWithoutHouseholdInput> | BabyCreateWithoutHouseholdInput[] | BabyUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: BabyCreateOrConnectWithoutHouseholdInput | BabyCreateOrConnectWithoutHouseholdInput[]
    upsert?: BabyUpsertWithWhereUniqueWithoutHouseholdInput | BabyUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: BabyCreateManyHouseholdInputEnvelope
    set?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    disconnect?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    delete?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    connect?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    update?: BabyUpdateWithWhereUniqueWithoutHouseholdInput | BabyUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: BabyUpdateManyWithWhereWithoutHouseholdInput | BabyUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: BabyScalarWhereInput | BabyScalarWhereInput[]
  }

  export type CaregiverInviteUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<CaregiverInviteCreateWithoutHouseholdInput, CaregiverInviteUncheckedCreateWithoutHouseholdInput> | CaregiverInviteCreateWithoutHouseholdInput[] | CaregiverInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutHouseholdInput | CaregiverInviteCreateOrConnectWithoutHouseholdInput[]
    upsert?: CaregiverInviteUpsertWithWhereUniqueWithoutHouseholdInput | CaregiverInviteUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: CaregiverInviteCreateManyHouseholdInputEnvelope
    set?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    disconnect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    delete?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    update?: CaregiverInviteUpdateWithWhereUniqueWithoutHouseholdInput | CaregiverInviteUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: CaregiverInviteUpdateManyWithWhereWithoutHouseholdInput | CaregiverInviteUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
  }

  export type HouseholdMembershipUncheckedUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<HouseholdMembershipCreateWithoutHouseholdInput, HouseholdMembershipUncheckedCreateWithoutHouseholdInput> | HouseholdMembershipCreateWithoutHouseholdInput[] | HouseholdMembershipUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutHouseholdInput | HouseholdMembershipCreateOrConnectWithoutHouseholdInput[]
    upsert?: HouseholdMembershipUpsertWithWhereUniqueWithoutHouseholdInput | HouseholdMembershipUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: HouseholdMembershipCreateManyHouseholdInputEnvelope
    set?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    disconnect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    delete?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    update?: HouseholdMembershipUpdateWithWhereUniqueWithoutHouseholdInput | HouseholdMembershipUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: HouseholdMembershipUpdateManyWithWhereWithoutHouseholdInput | HouseholdMembershipUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: HouseholdMembershipScalarWhereInput | HouseholdMembershipScalarWhereInput[]
  }

  export type BabyUncheckedUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<BabyCreateWithoutHouseholdInput, BabyUncheckedCreateWithoutHouseholdInput> | BabyCreateWithoutHouseholdInput[] | BabyUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: BabyCreateOrConnectWithoutHouseholdInput | BabyCreateOrConnectWithoutHouseholdInput[]
    upsert?: BabyUpsertWithWhereUniqueWithoutHouseholdInput | BabyUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: BabyCreateManyHouseholdInputEnvelope
    set?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    disconnect?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    delete?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    connect?: BabyWhereUniqueInput | BabyWhereUniqueInput[]
    update?: BabyUpdateWithWhereUniqueWithoutHouseholdInput | BabyUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: BabyUpdateManyWithWhereWithoutHouseholdInput | BabyUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: BabyScalarWhereInput | BabyScalarWhereInput[]
  }

  export type CaregiverInviteUncheckedUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<CaregiverInviteCreateWithoutHouseholdInput, CaregiverInviteUncheckedCreateWithoutHouseholdInput> | CaregiverInviteCreateWithoutHouseholdInput[] | CaregiverInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutHouseholdInput | CaregiverInviteCreateOrConnectWithoutHouseholdInput[]
    upsert?: CaregiverInviteUpsertWithWhereUniqueWithoutHouseholdInput | CaregiverInviteUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: CaregiverInviteCreateManyHouseholdInputEnvelope
    set?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    disconnect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    delete?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    update?: CaregiverInviteUpdateWithWhereUniqueWithoutHouseholdInput | CaregiverInviteUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: CaregiverInviteUpdateManyWithWhereWithoutHouseholdInput | CaregiverInviteUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutHouseholdMembershipsInput = {
    create?: XOR<UserCreateWithoutHouseholdMembershipsInput, UserUncheckedCreateWithoutHouseholdMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHouseholdMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type HouseholdCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<HouseholdCreateWithoutMembershipsInput, HouseholdUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutMembershipsInput
    connect?: HouseholdWhereUniqueInput
  }

  export type EnumHouseholdRoleFieldUpdateOperationsInput = {
    set?: $Enums.HouseholdRole
  }

  export type UserUpdateOneRequiredWithoutHouseholdMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutHouseholdMembershipsInput, UserUncheckedCreateWithoutHouseholdMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHouseholdMembershipsInput
    upsert?: UserUpsertWithoutHouseholdMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHouseholdMembershipsInput, UserUpdateWithoutHouseholdMembershipsInput>, UserUncheckedUpdateWithoutHouseholdMembershipsInput>
  }

  export type HouseholdUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<HouseholdCreateWithoutMembershipsInput, HouseholdUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutMembershipsInput
    upsert?: HouseholdUpsertWithoutMembershipsInput
    connect?: HouseholdWhereUniqueInput
    update?: XOR<XOR<HouseholdUpdateToOneWithWhereWithoutMembershipsInput, HouseholdUpdateWithoutMembershipsInput>, HouseholdUncheckedUpdateWithoutMembershipsInput>
  }

  export type HouseholdCreateNestedOneWithoutInvitesInput = {
    create?: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutInvitesInput
    connect?: HouseholdWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInvitesSentInput = {
    create?: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInvitesAcceptedInput = {
    create?: XOR<UserCreateWithoutInvitesAcceptedInput, UserUncheckedCreateWithoutInvitesAcceptedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesAcceptedInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type HouseholdUpdateOneRequiredWithoutInvitesNestedInput = {
    create?: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutInvitesInput
    upsert?: HouseholdUpsertWithoutInvitesInput
    connect?: HouseholdWhereUniqueInput
    update?: XOR<XOR<HouseholdUpdateToOneWithWhereWithoutInvitesInput, HouseholdUpdateWithoutInvitesInput>, HouseholdUncheckedUpdateWithoutInvitesInput>
  }

  export type UserUpdateOneRequiredWithoutInvitesSentNestedInput = {
    create?: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesSentInput
    upsert?: UserUpsertWithoutInvitesSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitesSentInput, UserUpdateWithoutInvitesSentInput>, UserUncheckedUpdateWithoutInvitesSentInput>
  }

  export type UserUpdateOneWithoutInvitesAcceptedNestedInput = {
    create?: XOR<UserCreateWithoutInvitesAcceptedInput, UserUncheckedCreateWithoutInvitesAcceptedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesAcceptedInput
    upsert?: UserUpsertWithoutInvitesAcceptedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitesAcceptedInput, UserUpdateWithoutInvitesAcceptedInput>, UserUncheckedUpdateWithoutInvitesAcceptedInput>
  }

  export type HouseholdCreateNestedOneWithoutBabiesInput = {
    create?: XOR<HouseholdCreateWithoutBabiesInput, HouseholdUncheckedCreateWithoutBabiesInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutBabiesInput
    connect?: HouseholdWhereUniqueInput
  }

  export type FeedingEventCreateNestedManyWithoutBabyInput = {
    create?: XOR<FeedingEventCreateWithoutBabyInput, FeedingEventUncheckedCreateWithoutBabyInput> | FeedingEventCreateWithoutBabyInput[] | FeedingEventUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutBabyInput | FeedingEventCreateOrConnectWithoutBabyInput[]
    createMany?: FeedingEventCreateManyBabyInputEnvelope
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
  }

  export type ConsultationCreateNestedManyWithoutBabyInput = {
    create?: XOR<ConsultationCreateWithoutBabyInput, ConsultationUncheckedCreateWithoutBabyInput> | ConsultationCreateWithoutBabyInput[] | ConsultationUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutBabyInput | ConsultationCreateOrConnectWithoutBabyInput[]
    createMany?: ConsultationCreateManyBabyInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutBabyInput = {
    create?: XOR<AppointmentCreateWithoutBabyInput, AppointmentUncheckedCreateWithoutBabyInput> | AppointmentCreateWithoutBabyInput[] | AppointmentUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBabyInput | AppointmentCreateOrConnectWithoutBabyInput[]
    createMany?: AppointmentCreateManyBabyInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PredictionCacheCreateNestedManyWithoutBabyInput = {
    create?: XOR<PredictionCacheCreateWithoutBabyInput, PredictionCacheUncheckedCreateWithoutBabyInput> | PredictionCacheCreateWithoutBabyInput[] | PredictionCacheUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: PredictionCacheCreateOrConnectWithoutBabyInput | PredictionCacheCreateOrConnectWithoutBabyInput[]
    createMany?: PredictionCacheCreateManyBabyInputEnvelope
    connect?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
  }

  export type FeedingEventUncheckedCreateNestedManyWithoutBabyInput = {
    create?: XOR<FeedingEventCreateWithoutBabyInput, FeedingEventUncheckedCreateWithoutBabyInput> | FeedingEventCreateWithoutBabyInput[] | FeedingEventUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutBabyInput | FeedingEventCreateOrConnectWithoutBabyInput[]
    createMany?: FeedingEventCreateManyBabyInputEnvelope
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutBabyInput = {
    create?: XOR<ConsultationCreateWithoutBabyInput, ConsultationUncheckedCreateWithoutBabyInput> | ConsultationCreateWithoutBabyInput[] | ConsultationUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutBabyInput | ConsultationCreateOrConnectWithoutBabyInput[]
    createMany?: ConsultationCreateManyBabyInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutBabyInput = {
    create?: XOR<AppointmentCreateWithoutBabyInput, AppointmentUncheckedCreateWithoutBabyInput> | AppointmentCreateWithoutBabyInput[] | AppointmentUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBabyInput | AppointmentCreateOrConnectWithoutBabyInput[]
    createMany?: AppointmentCreateManyBabyInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PredictionCacheUncheckedCreateNestedManyWithoutBabyInput = {
    create?: XOR<PredictionCacheCreateWithoutBabyInput, PredictionCacheUncheckedCreateWithoutBabyInput> | PredictionCacheCreateWithoutBabyInput[] | PredictionCacheUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: PredictionCacheCreateOrConnectWithoutBabyInput | PredictionCacheCreateOrConnectWithoutBabyInput[]
    createMany?: PredictionCacheCreateManyBabyInputEnvelope
    connect?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumBabySexFieldUpdateOperationsInput = {
    set?: $Enums.BabySex
  }

  export type HouseholdUpdateOneRequiredWithoutBabiesNestedInput = {
    create?: XOR<HouseholdCreateWithoutBabiesInput, HouseholdUncheckedCreateWithoutBabiesInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutBabiesInput
    upsert?: HouseholdUpsertWithoutBabiesInput
    connect?: HouseholdWhereUniqueInput
    update?: XOR<XOR<HouseholdUpdateToOneWithWhereWithoutBabiesInput, HouseholdUpdateWithoutBabiesInput>, HouseholdUncheckedUpdateWithoutBabiesInput>
  }

  export type FeedingEventUpdateManyWithoutBabyNestedInput = {
    create?: XOR<FeedingEventCreateWithoutBabyInput, FeedingEventUncheckedCreateWithoutBabyInput> | FeedingEventCreateWithoutBabyInput[] | FeedingEventUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutBabyInput | FeedingEventCreateOrConnectWithoutBabyInput[]
    upsert?: FeedingEventUpsertWithWhereUniqueWithoutBabyInput | FeedingEventUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: FeedingEventCreateManyBabyInputEnvelope
    set?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    disconnect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    delete?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    update?: FeedingEventUpdateWithWhereUniqueWithoutBabyInput | FeedingEventUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: FeedingEventUpdateManyWithWhereWithoutBabyInput | FeedingEventUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: FeedingEventScalarWhereInput | FeedingEventScalarWhereInput[]
  }

  export type ConsultationUpdateManyWithoutBabyNestedInput = {
    create?: XOR<ConsultationCreateWithoutBabyInput, ConsultationUncheckedCreateWithoutBabyInput> | ConsultationCreateWithoutBabyInput[] | ConsultationUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutBabyInput | ConsultationCreateOrConnectWithoutBabyInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutBabyInput | ConsultationUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: ConsultationCreateManyBabyInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutBabyInput | ConsultationUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutBabyInput | ConsultationUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutBabyNestedInput = {
    create?: XOR<AppointmentCreateWithoutBabyInput, AppointmentUncheckedCreateWithoutBabyInput> | AppointmentCreateWithoutBabyInput[] | AppointmentUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBabyInput | AppointmentCreateOrConnectWithoutBabyInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutBabyInput | AppointmentUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: AppointmentCreateManyBabyInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutBabyInput | AppointmentUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutBabyInput | AppointmentUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PredictionCacheUpdateManyWithoutBabyNestedInput = {
    create?: XOR<PredictionCacheCreateWithoutBabyInput, PredictionCacheUncheckedCreateWithoutBabyInput> | PredictionCacheCreateWithoutBabyInput[] | PredictionCacheUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: PredictionCacheCreateOrConnectWithoutBabyInput | PredictionCacheCreateOrConnectWithoutBabyInput[]
    upsert?: PredictionCacheUpsertWithWhereUniqueWithoutBabyInput | PredictionCacheUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: PredictionCacheCreateManyBabyInputEnvelope
    set?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    disconnect?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    delete?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    connect?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    update?: PredictionCacheUpdateWithWhereUniqueWithoutBabyInput | PredictionCacheUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: PredictionCacheUpdateManyWithWhereWithoutBabyInput | PredictionCacheUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: PredictionCacheScalarWhereInput | PredictionCacheScalarWhereInput[]
  }

  export type FeedingEventUncheckedUpdateManyWithoutBabyNestedInput = {
    create?: XOR<FeedingEventCreateWithoutBabyInput, FeedingEventUncheckedCreateWithoutBabyInput> | FeedingEventCreateWithoutBabyInput[] | FeedingEventUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutBabyInput | FeedingEventCreateOrConnectWithoutBabyInput[]
    upsert?: FeedingEventUpsertWithWhereUniqueWithoutBabyInput | FeedingEventUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: FeedingEventCreateManyBabyInputEnvelope
    set?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    disconnect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    delete?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    update?: FeedingEventUpdateWithWhereUniqueWithoutBabyInput | FeedingEventUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: FeedingEventUpdateManyWithWhereWithoutBabyInput | FeedingEventUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: FeedingEventScalarWhereInput | FeedingEventScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutBabyNestedInput = {
    create?: XOR<ConsultationCreateWithoutBabyInput, ConsultationUncheckedCreateWithoutBabyInput> | ConsultationCreateWithoutBabyInput[] | ConsultationUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutBabyInput | ConsultationCreateOrConnectWithoutBabyInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutBabyInput | ConsultationUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: ConsultationCreateManyBabyInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutBabyInput | ConsultationUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutBabyInput | ConsultationUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutBabyNestedInput = {
    create?: XOR<AppointmentCreateWithoutBabyInput, AppointmentUncheckedCreateWithoutBabyInput> | AppointmentCreateWithoutBabyInput[] | AppointmentUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutBabyInput | AppointmentCreateOrConnectWithoutBabyInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutBabyInput | AppointmentUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: AppointmentCreateManyBabyInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutBabyInput | AppointmentUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutBabyInput | AppointmentUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PredictionCacheUncheckedUpdateManyWithoutBabyNestedInput = {
    create?: XOR<PredictionCacheCreateWithoutBabyInput, PredictionCacheUncheckedCreateWithoutBabyInput> | PredictionCacheCreateWithoutBabyInput[] | PredictionCacheUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: PredictionCacheCreateOrConnectWithoutBabyInput | PredictionCacheCreateOrConnectWithoutBabyInput[]
    upsert?: PredictionCacheUpsertWithWhereUniqueWithoutBabyInput | PredictionCacheUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: PredictionCacheCreateManyBabyInputEnvelope
    set?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    disconnect?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    delete?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    connect?: PredictionCacheWhereUniqueInput | PredictionCacheWhereUniqueInput[]
    update?: PredictionCacheUpdateWithWhereUniqueWithoutBabyInput | PredictionCacheUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: PredictionCacheUpdateManyWithWhereWithoutBabyInput | PredictionCacheUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: PredictionCacheScalarWhereInput | PredictionCacheScalarWhereInput[]
  }

  export type BabyCreateNestedOneWithoutFeedingEventsInput = {
    create?: XOR<BabyCreateWithoutFeedingEventsInput, BabyUncheckedCreateWithoutFeedingEventsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutFeedingEventsInput
    connect?: BabyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFeedingEventsLoggedInput = {
    create?: XOR<UserCreateWithoutFeedingEventsLoggedInput, UserUncheckedCreateWithoutFeedingEventsLoggedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedingEventsLoggedInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumMilkTypeFieldUpdateOperationsInput = {
    set?: $Enums.MilkType
  }

  export type BabyUpdateOneRequiredWithoutFeedingEventsNestedInput = {
    create?: XOR<BabyCreateWithoutFeedingEventsInput, BabyUncheckedCreateWithoutFeedingEventsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutFeedingEventsInput
    upsert?: BabyUpsertWithoutFeedingEventsInput
    connect?: BabyWhereUniqueInput
    update?: XOR<XOR<BabyUpdateToOneWithWhereWithoutFeedingEventsInput, BabyUpdateWithoutFeedingEventsInput>, BabyUncheckedUpdateWithoutFeedingEventsInput>
  }

  export type UserUpdateOneRequiredWithoutFeedingEventsLoggedNestedInput = {
    create?: XOR<UserCreateWithoutFeedingEventsLoggedInput, UserUncheckedCreateWithoutFeedingEventsLoggedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedingEventsLoggedInput
    upsert?: UserUpsertWithoutFeedingEventsLoggedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedingEventsLoggedInput, UserUpdateWithoutFeedingEventsLoggedInput>, UserUncheckedUpdateWithoutFeedingEventsLoggedInput>
  }

  export type BabyCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<BabyCreateWithoutConsultationsInput, BabyUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutConsultationsInput
    connect?: BabyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutConsultationsRecordedInput = {
    create?: XOR<UserCreateWithoutConsultationsRecordedInput, UserUncheckedCreateWithoutConsultationsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsultationsRecordedInput
    connect?: UserWhereUniqueInput
  }

  export type BabyUpdateOneRequiredWithoutConsultationsNestedInput = {
    create?: XOR<BabyCreateWithoutConsultationsInput, BabyUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutConsultationsInput
    upsert?: BabyUpsertWithoutConsultationsInput
    connect?: BabyWhereUniqueInput
    update?: XOR<XOR<BabyUpdateToOneWithWhereWithoutConsultationsInput, BabyUpdateWithoutConsultationsInput>, BabyUncheckedUpdateWithoutConsultationsInput>
  }

  export type UserUpdateOneWithoutConsultationsRecordedNestedInput = {
    create?: XOR<UserCreateWithoutConsultationsRecordedInput, UserUncheckedCreateWithoutConsultationsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsultationsRecordedInput
    upsert?: UserUpsertWithoutConsultationsRecordedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConsultationsRecordedInput, UserUpdateWithoutConsultationsRecordedInput>, UserUncheckedUpdateWithoutConsultationsRecordedInput>
  }

  export type BabyCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<BabyCreateWithoutAppointmentsInput, BabyUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutAppointmentsInput
    connect?: BabyWhereUniqueInput
  }

  export type BabyUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<BabyCreateWithoutAppointmentsInput, BabyUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutAppointmentsInput
    upsert?: BabyUpsertWithoutAppointmentsInput
    connect?: BabyWhereUniqueInput
    update?: XOR<XOR<BabyUpdateToOneWithWhereWithoutAppointmentsInput, BabyUpdateWithoutAppointmentsInput>, BabyUncheckedUpdateWithoutAppointmentsInput>
  }

  export type BabyCreateNestedOneWithoutPredictionCachesInput = {
    create?: XOR<BabyCreateWithoutPredictionCachesInput, BabyUncheckedCreateWithoutPredictionCachesInput>
    connectOrCreate?: BabyCreateOrConnectWithoutPredictionCachesInput
    connect?: BabyWhereUniqueInput
  }

  export type BabyUpdateOneRequiredWithoutPredictionCachesNestedInput = {
    create?: XOR<BabyCreateWithoutPredictionCachesInput, BabyUncheckedCreateWithoutPredictionCachesInput>
    connectOrCreate?: BabyCreateOrConnectWithoutPredictionCachesInput
    upsert?: BabyUpsertWithoutPredictionCachesInput
    connect?: BabyWhereUniqueInput
    update?: XOR<XOR<BabyUpdateToOneWithWhereWithoutPredictionCachesInput, BabyUpdateWithoutPredictionCachesInput>, BabyUncheckedUpdateWithoutPredictionCachesInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type HouseholdMembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<HouseholdMembershipCreateWithoutUserInput, HouseholdMembershipUncheckedCreateWithoutUserInput> | HouseholdMembershipCreateWithoutUserInput[] | HouseholdMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutUserInput | HouseholdMembershipCreateOrConnectWithoutUserInput[]
    createMany?: HouseholdMembershipCreateManyUserInputEnvelope
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
  }

  export type CaregiverInviteCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<CaregiverInviteCreateWithoutInvitedByInput, CaregiverInviteUncheckedCreateWithoutInvitedByInput> | CaregiverInviteCreateWithoutInvitedByInput[] | CaregiverInviteUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutInvitedByInput | CaregiverInviteCreateOrConnectWithoutInvitedByInput[]
    createMany?: CaregiverInviteCreateManyInvitedByInputEnvelope
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
  }

  export type CaregiverInviteCreateNestedManyWithoutAcceptedByInput = {
    create?: XOR<CaregiverInviteCreateWithoutAcceptedByInput, CaregiverInviteUncheckedCreateWithoutAcceptedByInput> | CaregiverInviteCreateWithoutAcceptedByInput[] | CaregiverInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutAcceptedByInput | CaregiverInviteCreateOrConnectWithoutAcceptedByInput[]
    createMany?: CaregiverInviteCreateManyAcceptedByInputEnvelope
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
  }

  export type FeedingEventCreateNestedManyWithoutLoggedByInput = {
    create?: XOR<FeedingEventCreateWithoutLoggedByInput, FeedingEventUncheckedCreateWithoutLoggedByInput> | FeedingEventCreateWithoutLoggedByInput[] | FeedingEventUncheckedCreateWithoutLoggedByInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutLoggedByInput | FeedingEventCreateOrConnectWithoutLoggedByInput[]
    createMany?: FeedingEventCreateManyLoggedByInputEnvelope
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
  }

  export type ConsultationCreateNestedManyWithoutRecordedByInput = {
    create?: XOR<ConsultationCreateWithoutRecordedByInput, ConsultationUncheckedCreateWithoutRecordedByInput> | ConsultationCreateWithoutRecordedByInput[] | ConsultationUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRecordedByInput | ConsultationCreateOrConnectWithoutRecordedByInput[]
    createMany?: ConsultationCreateManyRecordedByInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HouseholdMembershipCreateWithoutUserInput, HouseholdMembershipUncheckedCreateWithoutUserInput> | HouseholdMembershipCreateWithoutUserInput[] | HouseholdMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutUserInput | HouseholdMembershipCreateOrConnectWithoutUserInput[]
    createMany?: HouseholdMembershipCreateManyUserInputEnvelope
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
  }

  export type CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<CaregiverInviteCreateWithoutInvitedByInput, CaregiverInviteUncheckedCreateWithoutInvitedByInput> | CaregiverInviteCreateWithoutInvitedByInput[] | CaregiverInviteUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutInvitedByInput | CaregiverInviteCreateOrConnectWithoutInvitedByInput[]
    createMany?: CaregiverInviteCreateManyInvitedByInputEnvelope
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
  }

  export type CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput = {
    create?: XOR<CaregiverInviteCreateWithoutAcceptedByInput, CaregiverInviteUncheckedCreateWithoutAcceptedByInput> | CaregiverInviteCreateWithoutAcceptedByInput[] | CaregiverInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutAcceptedByInput | CaregiverInviteCreateOrConnectWithoutAcceptedByInput[]
    createMany?: CaregiverInviteCreateManyAcceptedByInputEnvelope
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
  }

  export type FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput = {
    create?: XOR<FeedingEventCreateWithoutLoggedByInput, FeedingEventUncheckedCreateWithoutLoggedByInput> | FeedingEventCreateWithoutLoggedByInput[] | FeedingEventUncheckedCreateWithoutLoggedByInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutLoggedByInput | FeedingEventCreateOrConnectWithoutLoggedByInput[]
    createMany?: FeedingEventCreateManyLoggedByInputEnvelope
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutRecordedByInput = {
    create?: XOR<ConsultationCreateWithoutRecordedByInput, ConsultationUncheckedCreateWithoutRecordedByInput> | ConsultationCreateWithoutRecordedByInput[] | ConsultationUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRecordedByInput | ConsultationCreateOrConnectWithoutRecordedByInput[]
    createMany?: ConsultationCreateManyRecordedByInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type HouseholdMembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<HouseholdMembershipCreateWithoutUserInput, HouseholdMembershipUncheckedCreateWithoutUserInput> | HouseholdMembershipCreateWithoutUserInput[] | HouseholdMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutUserInput | HouseholdMembershipCreateOrConnectWithoutUserInput[]
    upsert?: HouseholdMembershipUpsertWithWhereUniqueWithoutUserInput | HouseholdMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HouseholdMembershipCreateManyUserInputEnvelope
    set?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    disconnect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    delete?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    update?: HouseholdMembershipUpdateWithWhereUniqueWithoutUserInput | HouseholdMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HouseholdMembershipUpdateManyWithWhereWithoutUserInput | HouseholdMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HouseholdMembershipScalarWhereInput | HouseholdMembershipScalarWhereInput[]
  }

  export type CaregiverInviteUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<CaregiverInviteCreateWithoutInvitedByInput, CaregiverInviteUncheckedCreateWithoutInvitedByInput> | CaregiverInviteCreateWithoutInvitedByInput[] | CaregiverInviteUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutInvitedByInput | CaregiverInviteCreateOrConnectWithoutInvitedByInput[]
    upsert?: CaregiverInviteUpsertWithWhereUniqueWithoutInvitedByInput | CaregiverInviteUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: CaregiverInviteCreateManyInvitedByInputEnvelope
    set?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    disconnect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    delete?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    update?: CaregiverInviteUpdateWithWhereUniqueWithoutInvitedByInput | CaregiverInviteUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: CaregiverInviteUpdateManyWithWhereWithoutInvitedByInput | CaregiverInviteUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
  }

  export type CaregiverInviteUpdateManyWithoutAcceptedByNestedInput = {
    create?: XOR<CaregiverInviteCreateWithoutAcceptedByInput, CaregiverInviteUncheckedCreateWithoutAcceptedByInput> | CaregiverInviteCreateWithoutAcceptedByInput[] | CaregiverInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutAcceptedByInput | CaregiverInviteCreateOrConnectWithoutAcceptedByInput[]
    upsert?: CaregiverInviteUpsertWithWhereUniqueWithoutAcceptedByInput | CaregiverInviteUpsertWithWhereUniqueWithoutAcceptedByInput[]
    createMany?: CaregiverInviteCreateManyAcceptedByInputEnvelope
    set?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    disconnect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    delete?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    update?: CaregiverInviteUpdateWithWhereUniqueWithoutAcceptedByInput | CaregiverInviteUpdateWithWhereUniqueWithoutAcceptedByInput[]
    updateMany?: CaregiverInviteUpdateManyWithWhereWithoutAcceptedByInput | CaregiverInviteUpdateManyWithWhereWithoutAcceptedByInput[]
    deleteMany?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
  }

  export type FeedingEventUpdateManyWithoutLoggedByNestedInput = {
    create?: XOR<FeedingEventCreateWithoutLoggedByInput, FeedingEventUncheckedCreateWithoutLoggedByInput> | FeedingEventCreateWithoutLoggedByInput[] | FeedingEventUncheckedCreateWithoutLoggedByInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutLoggedByInput | FeedingEventCreateOrConnectWithoutLoggedByInput[]
    upsert?: FeedingEventUpsertWithWhereUniqueWithoutLoggedByInput | FeedingEventUpsertWithWhereUniqueWithoutLoggedByInput[]
    createMany?: FeedingEventCreateManyLoggedByInputEnvelope
    set?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    disconnect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    delete?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    update?: FeedingEventUpdateWithWhereUniqueWithoutLoggedByInput | FeedingEventUpdateWithWhereUniqueWithoutLoggedByInput[]
    updateMany?: FeedingEventUpdateManyWithWhereWithoutLoggedByInput | FeedingEventUpdateManyWithWhereWithoutLoggedByInput[]
    deleteMany?: FeedingEventScalarWhereInput | FeedingEventScalarWhereInput[]
  }

  export type ConsultationUpdateManyWithoutRecordedByNestedInput = {
    create?: XOR<ConsultationCreateWithoutRecordedByInput, ConsultationUncheckedCreateWithoutRecordedByInput> | ConsultationCreateWithoutRecordedByInput[] | ConsultationUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRecordedByInput | ConsultationCreateOrConnectWithoutRecordedByInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutRecordedByInput | ConsultationUpsertWithWhereUniqueWithoutRecordedByInput[]
    createMany?: ConsultationCreateManyRecordedByInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutRecordedByInput | ConsultationUpdateWithWhereUniqueWithoutRecordedByInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutRecordedByInput | ConsultationUpdateManyWithWhereWithoutRecordedByInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HouseholdMembershipCreateWithoutUserInput, HouseholdMembershipUncheckedCreateWithoutUserInput> | HouseholdMembershipCreateWithoutUserInput[] | HouseholdMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMembershipCreateOrConnectWithoutUserInput | HouseholdMembershipCreateOrConnectWithoutUserInput[]
    upsert?: HouseholdMembershipUpsertWithWhereUniqueWithoutUserInput | HouseholdMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HouseholdMembershipCreateManyUserInputEnvelope
    set?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    disconnect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    delete?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    connect?: HouseholdMembershipWhereUniqueInput | HouseholdMembershipWhereUniqueInput[]
    update?: HouseholdMembershipUpdateWithWhereUniqueWithoutUserInput | HouseholdMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HouseholdMembershipUpdateManyWithWhereWithoutUserInput | HouseholdMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HouseholdMembershipScalarWhereInput | HouseholdMembershipScalarWhereInput[]
  }

  export type CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<CaregiverInviteCreateWithoutInvitedByInput, CaregiverInviteUncheckedCreateWithoutInvitedByInput> | CaregiverInviteCreateWithoutInvitedByInput[] | CaregiverInviteUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutInvitedByInput | CaregiverInviteCreateOrConnectWithoutInvitedByInput[]
    upsert?: CaregiverInviteUpsertWithWhereUniqueWithoutInvitedByInput | CaregiverInviteUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: CaregiverInviteCreateManyInvitedByInputEnvelope
    set?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    disconnect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    delete?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    update?: CaregiverInviteUpdateWithWhereUniqueWithoutInvitedByInput | CaregiverInviteUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: CaregiverInviteUpdateManyWithWhereWithoutInvitedByInput | CaregiverInviteUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
  }

  export type CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput = {
    create?: XOR<CaregiverInviteCreateWithoutAcceptedByInput, CaregiverInviteUncheckedCreateWithoutAcceptedByInput> | CaregiverInviteCreateWithoutAcceptedByInput[] | CaregiverInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: CaregiverInviteCreateOrConnectWithoutAcceptedByInput | CaregiverInviteCreateOrConnectWithoutAcceptedByInput[]
    upsert?: CaregiverInviteUpsertWithWhereUniqueWithoutAcceptedByInput | CaregiverInviteUpsertWithWhereUniqueWithoutAcceptedByInput[]
    createMany?: CaregiverInviteCreateManyAcceptedByInputEnvelope
    set?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    disconnect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    delete?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    connect?: CaregiverInviteWhereUniqueInput | CaregiverInviteWhereUniqueInput[]
    update?: CaregiverInviteUpdateWithWhereUniqueWithoutAcceptedByInput | CaregiverInviteUpdateWithWhereUniqueWithoutAcceptedByInput[]
    updateMany?: CaregiverInviteUpdateManyWithWhereWithoutAcceptedByInput | CaregiverInviteUpdateManyWithWhereWithoutAcceptedByInput[]
    deleteMany?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
  }

  export type FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput = {
    create?: XOR<FeedingEventCreateWithoutLoggedByInput, FeedingEventUncheckedCreateWithoutLoggedByInput> | FeedingEventCreateWithoutLoggedByInput[] | FeedingEventUncheckedCreateWithoutLoggedByInput[]
    connectOrCreate?: FeedingEventCreateOrConnectWithoutLoggedByInput | FeedingEventCreateOrConnectWithoutLoggedByInput[]
    upsert?: FeedingEventUpsertWithWhereUniqueWithoutLoggedByInput | FeedingEventUpsertWithWhereUniqueWithoutLoggedByInput[]
    createMany?: FeedingEventCreateManyLoggedByInputEnvelope
    set?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    disconnect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    delete?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    connect?: FeedingEventWhereUniqueInput | FeedingEventWhereUniqueInput[]
    update?: FeedingEventUpdateWithWhereUniqueWithoutLoggedByInput | FeedingEventUpdateWithWhereUniqueWithoutLoggedByInput[]
    updateMany?: FeedingEventUpdateManyWithWhereWithoutLoggedByInput | FeedingEventUpdateManyWithWhereWithoutLoggedByInput[]
    deleteMany?: FeedingEventScalarWhereInput | FeedingEventScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput = {
    create?: XOR<ConsultationCreateWithoutRecordedByInput, ConsultationUncheckedCreateWithoutRecordedByInput> | ConsultationCreateWithoutRecordedByInput[] | ConsultationUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRecordedByInput | ConsultationCreateOrConnectWithoutRecordedByInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutRecordedByInput | ConsultationUpsertWithWhereUniqueWithoutRecordedByInput[]
    createMany?: ConsultationCreateManyRecordedByInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutRecordedByInput | ConsultationUpdateWithWhereUniqueWithoutRecordedByInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutRecordedByInput | ConsultationUpdateManyWithWhereWithoutRecordedByInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumHouseholdRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleFilter<$PrismaModel> | $Enums.HouseholdRole
  }

  export type NestedEnumHouseholdRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleWithAggregatesFilter<$PrismaModel> | $Enums.HouseholdRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHouseholdRoleFilter<$PrismaModel>
    _max?: NestedEnumHouseholdRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBabySexFilter<$PrismaModel = never> = {
    equals?: $Enums.BabySex | EnumBabySexFieldRefInput<$PrismaModel>
    in?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    notIn?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    not?: NestedEnumBabySexFilter<$PrismaModel> | $Enums.BabySex
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumBabySexWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BabySex | EnumBabySexFieldRefInput<$PrismaModel>
    in?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    notIn?: $Enums.BabySex[] | ListEnumBabySexFieldRefInput<$PrismaModel>
    not?: NestedEnumBabySexWithAggregatesFilter<$PrismaModel> | $Enums.BabySex
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBabySexFilter<$PrismaModel>
    _max?: NestedEnumBabySexFilter<$PrismaModel>
  }

  export type NestedEnumMilkTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MilkType | EnumMilkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMilkTypeFilter<$PrismaModel> | $Enums.MilkType
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumMilkTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MilkType | EnumMilkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MilkType[] | ListEnumMilkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMilkTypeWithAggregatesFilter<$PrismaModel> | $Enums.MilkType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMilkTypeFilter<$PrismaModel>
    _max?: NestedEnumMilkTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type HouseholdMembershipCreateWithoutHouseholdInput = {
    id?: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHouseholdMembershipsInput
  }

  export type HouseholdMembershipUncheckedCreateWithoutHouseholdInput = {
    id?: string
    userId: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HouseholdMembershipCreateOrConnectWithoutHouseholdInput = {
    where: HouseholdMembershipWhereUniqueInput
    create: XOR<HouseholdMembershipCreateWithoutHouseholdInput, HouseholdMembershipUncheckedCreateWithoutHouseholdInput>
  }

  export type HouseholdMembershipCreateManyHouseholdInputEnvelope = {
    data: HouseholdMembershipCreateManyHouseholdInput | HouseholdMembershipCreateManyHouseholdInput[]
    skipDuplicates?: boolean
  }

  export type BabyCreateWithoutHouseholdInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedingEvents?: FeedingEventCreateNestedManyWithoutBabyInput
    consultations?: ConsultationCreateNestedManyWithoutBabyInput
    appointments?: AppointmentCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutHouseholdInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedingEvents?: FeedingEventUncheckedCreateNestedManyWithoutBabyInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutBabyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutHouseholdInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutHouseholdInput, BabyUncheckedCreateWithoutHouseholdInput>
  }

  export type BabyCreateManyHouseholdInputEnvelope = {
    data: BabyCreateManyHouseholdInput | BabyCreateManyHouseholdInput[]
    skipDuplicates?: boolean
  }

  export type CaregiverInviteCreateWithoutHouseholdInput = {
    id?: string
    emailNormalized: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    invitedBy: UserCreateNestedOneWithoutInvitesSentInput
    acceptedBy?: UserCreateNestedOneWithoutInvitesAcceptedInput
  }

  export type CaregiverInviteUncheckedCreateWithoutHouseholdInput = {
    id?: string
    emailNormalized: string
    token: string
    invitedByUserId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    acceptedByUserId?: string | null
  }

  export type CaregiverInviteCreateOrConnectWithoutHouseholdInput = {
    where: CaregiverInviteWhereUniqueInput
    create: XOR<CaregiverInviteCreateWithoutHouseholdInput, CaregiverInviteUncheckedCreateWithoutHouseholdInput>
  }

  export type CaregiverInviteCreateManyHouseholdInputEnvelope = {
    data: CaregiverInviteCreateManyHouseholdInput | CaregiverInviteCreateManyHouseholdInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdMembershipUpsertWithWhereUniqueWithoutHouseholdInput = {
    where: HouseholdMembershipWhereUniqueInput
    update: XOR<HouseholdMembershipUpdateWithoutHouseholdInput, HouseholdMembershipUncheckedUpdateWithoutHouseholdInput>
    create: XOR<HouseholdMembershipCreateWithoutHouseholdInput, HouseholdMembershipUncheckedCreateWithoutHouseholdInput>
  }

  export type HouseholdMembershipUpdateWithWhereUniqueWithoutHouseholdInput = {
    where: HouseholdMembershipWhereUniqueInput
    data: XOR<HouseholdMembershipUpdateWithoutHouseholdInput, HouseholdMembershipUncheckedUpdateWithoutHouseholdInput>
  }

  export type HouseholdMembershipUpdateManyWithWhereWithoutHouseholdInput = {
    where: HouseholdMembershipScalarWhereInput
    data: XOR<HouseholdMembershipUpdateManyMutationInput, HouseholdMembershipUncheckedUpdateManyWithoutHouseholdInput>
  }

  export type HouseholdMembershipScalarWhereInput = {
    AND?: HouseholdMembershipScalarWhereInput | HouseholdMembershipScalarWhereInput[]
    OR?: HouseholdMembershipScalarWhereInput[]
    NOT?: HouseholdMembershipScalarWhereInput | HouseholdMembershipScalarWhereInput[]
    id?: StringFilter<"HouseholdMembership"> | string
    userId?: StringFilter<"HouseholdMembership"> | string
    householdId?: StringFilter<"HouseholdMembership"> | string
    role?: EnumHouseholdRoleFilter<"HouseholdMembership"> | $Enums.HouseholdRole
    displayLabel?: StringNullableFilter<"HouseholdMembership"> | string | null
    createdAt?: DateTimeFilter<"HouseholdMembership"> | Date | string
    updatedAt?: DateTimeFilter<"HouseholdMembership"> | Date | string
  }

  export type BabyUpsertWithWhereUniqueWithoutHouseholdInput = {
    where: BabyWhereUniqueInput
    update: XOR<BabyUpdateWithoutHouseholdInput, BabyUncheckedUpdateWithoutHouseholdInput>
    create: XOR<BabyCreateWithoutHouseholdInput, BabyUncheckedCreateWithoutHouseholdInput>
  }

  export type BabyUpdateWithWhereUniqueWithoutHouseholdInput = {
    where: BabyWhereUniqueInput
    data: XOR<BabyUpdateWithoutHouseholdInput, BabyUncheckedUpdateWithoutHouseholdInput>
  }

  export type BabyUpdateManyWithWhereWithoutHouseholdInput = {
    where: BabyScalarWhereInput
    data: XOR<BabyUpdateManyMutationInput, BabyUncheckedUpdateManyWithoutHouseholdInput>
  }

  export type BabyScalarWhereInput = {
    AND?: BabyScalarWhereInput | BabyScalarWhereInput[]
    OR?: BabyScalarWhereInput[]
    NOT?: BabyScalarWhereInput | BabyScalarWhereInput[]
    id?: StringFilter<"Baby"> | string
    householdId?: StringFilter<"Baby"> | string
    displayName?: StringFilter<"Baby"> | string
    birthDateTime?: DateTimeFilter<"Baby"> | Date | string
    birthWeightGrams?: IntNullableFilter<"Baby"> | number | null
    birthLengthCm?: IntNullableFilter<"Baby"> | number | null
    headCircumferenceCm?: IntNullableFilter<"Baby"> | number | null
    sex?: EnumBabySexFilter<"Baby"> | $Enums.BabySex
    notes?: StringNullableFilter<"Baby"> | string | null
    timezone?: StringFilter<"Baby"> | string
    createdAt?: DateTimeFilter<"Baby"> | Date | string
    updatedAt?: DateTimeFilter<"Baby"> | Date | string
  }

  export type CaregiverInviteUpsertWithWhereUniqueWithoutHouseholdInput = {
    where: CaregiverInviteWhereUniqueInput
    update: XOR<CaregiverInviteUpdateWithoutHouseholdInput, CaregiverInviteUncheckedUpdateWithoutHouseholdInput>
    create: XOR<CaregiverInviteCreateWithoutHouseholdInput, CaregiverInviteUncheckedCreateWithoutHouseholdInput>
  }

  export type CaregiverInviteUpdateWithWhereUniqueWithoutHouseholdInput = {
    where: CaregiverInviteWhereUniqueInput
    data: XOR<CaregiverInviteUpdateWithoutHouseholdInput, CaregiverInviteUncheckedUpdateWithoutHouseholdInput>
  }

  export type CaregiverInviteUpdateManyWithWhereWithoutHouseholdInput = {
    where: CaregiverInviteScalarWhereInput
    data: XOR<CaregiverInviteUpdateManyMutationInput, CaregiverInviteUncheckedUpdateManyWithoutHouseholdInput>
  }

  export type CaregiverInviteScalarWhereInput = {
    AND?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
    OR?: CaregiverInviteScalarWhereInput[]
    NOT?: CaregiverInviteScalarWhereInput | CaregiverInviteScalarWhereInput[]
    id?: StringFilter<"CaregiverInvite"> | string
    householdId?: StringFilter<"CaregiverInvite"> | string
    emailNormalized?: StringFilter<"CaregiverInvite"> | string
    token?: StringFilter<"CaregiverInvite"> | string
    invitedByUserId?: StringFilter<"CaregiverInvite"> | string
    expiresAt?: DateTimeFilter<"CaregiverInvite"> | Date | string
    revokedAt?: DateTimeNullableFilter<"CaregiverInvite"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"CaregiverInvite"> | Date | string | null
    acceptedByUserId?: StringNullableFilter<"CaregiverInvite"> | string | null
  }

  export type UserCreateWithoutHouseholdMembershipsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateWithoutHouseholdMembershipsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserCreateOrConnectWithoutHouseholdMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHouseholdMembershipsInput, UserUncheckedCreateWithoutHouseholdMembershipsInput>
  }

  export type HouseholdCreateWithoutMembershipsInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    babies?: BabyCreateNestedManyWithoutHouseholdInput
    invites?: CaregiverInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    babies?: BabyUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: CaregiverInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutMembershipsInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutMembershipsInput, HouseholdUncheckedCreateWithoutMembershipsInput>
  }

  export type UserUpsertWithoutHouseholdMembershipsInput = {
    update: XOR<UserUpdateWithoutHouseholdMembershipsInput, UserUncheckedUpdateWithoutHouseholdMembershipsInput>
    create: XOR<UserCreateWithoutHouseholdMembershipsInput, UserUncheckedCreateWithoutHouseholdMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHouseholdMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHouseholdMembershipsInput, UserUncheckedUpdateWithoutHouseholdMembershipsInput>
  }

  export type UserUpdateWithoutHouseholdMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateWithoutHouseholdMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type HouseholdUpsertWithoutMembershipsInput = {
    update: XOR<HouseholdUpdateWithoutMembershipsInput, HouseholdUncheckedUpdateWithoutMembershipsInput>
    create: XOR<HouseholdCreateWithoutMembershipsInput, HouseholdUncheckedCreateWithoutMembershipsInput>
    where?: HouseholdWhereInput
  }

  export type HouseholdUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: HouseholdWhereInput
    data: XOR<HouseholdUpdateWithoutMembershipsInput, HouseholdUncheckedUpdateWithoutMembershipsInput>
  }

  export type HouseholdUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    babies?: BabyUpdateManyWithoutHouseholdNestedInput
    invites?: CaregiverInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    babies?: BabyUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: CaregiverInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdCreateWithoutInvitesInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: HouseholdMembershipCreateNestedManyWithoutHouseholdInput
    babies?: BabyCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutInvitesInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutHouseholdInput
    babies?: BabyUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutInvitesInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
  }

  export type UserCreateWithoutInvitesSentInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipCreateNestedManyWithoutUserInput
    invitesAccepted?: CaregiverInviteCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateWithoutInvitesSentInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput
    invitesAccepted?: CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserCreateOrConnectWithoutInvitesSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
  }

  export type UserCreateWithoutInvitesAcceptedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteCreateNestedManyWithoutInvitedByInput
    feedingEventsLogged?: FeedingEventCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateWithoutInvitesAcceptedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput
    feedingEventsLogged?: FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserCreateOrConnectWithoutInvitesAcceptedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitesAcceptedInput, UserUncheckedCreateWithoutInvitesAcceptedInput>
  }

  export type HouseholdUpsertWithoutInvitesInput = {
    update: XOR<HouseholdUpdateWithoutInvitesInput, HouseholdUncheckedUpdateWithoutInvitesInput>
    create: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
    where?: HouseholdWhereInput
  }

  export type HouseholdUpdateToOneWithWhereWithoutInvitesInput = {
    where?: HouseholdWhereInput
    data: XOR<HouseholdUpdateWithoutInvitesInput, HouseholdUncheckedUpdateWithoutInvitesInput>
  }

  export type HouseholdUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMembershipUpdateManyWithoutHouseholdNestedInput
    babies?: BabyUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMembershipUncheckedUpdateManyWithoutHouseholdNestedInput
    babies?: BabyUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type UserUpsertWithoutInvitesSentInput = {
    update: XOR<UserUpdateWithoutInvitesSentInput, UserUncheckedUpdateWithoutInvitesSentInput>
    create: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitesSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitesSentInput, UserUncheckedUpdateWithoutInvitesSentInput>
  }

  export type UserUpdateWithoutInvitesSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUpdateManyWithoutUserNestedInput
    invitesAccepted?: CaregiverInviteUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitesSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput
    invitesAccepted?: CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUpsertWithoutInvitesAcceptedInput = {
    update: XOR<UserUpdateWithoutInvitesAcceptedInput, UserUncheckedUpdateWithoutInvitesAcceptedInput>
    create: XOR<UserCreateWithoutInvitesAcceptedInput, UserUncheckedCreateWithoutInvitesAcceptedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitesAcceptedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitesAcceptedInput, UserUncheckedUpdateWithoutInvitesAcceptedInput>
  }

  export type UserUpdateWithoutInvitesAcceptedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUpdateManyWithoutInvitedByNestedInput
    feedingEventsLogged?: FeedingEventUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitesAcceptedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput
    feedingEventsLogged?: FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type HouseholdCreateWithoutBabiesInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: HouseholdMembershipCreateNestedManyWithoutHouseholdInput
    invites?: CaregiverInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutBabiesInput = {
    id?: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: CaregiverInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutBabiesInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutBabiesInput, HouseholdUncheckedCreateWithoutBabiesInput>
  }

  export type FeedingEventCreateWithoutBabyInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loggedBy: UserCreateNestedOneWithoutFeedingEventsLoggedInput
  }

  export type FeedingEventUncheckedCreateWithoutBabyInput = {
    id?: string
    loggedByUserId: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedingEventCreateOrConnectWithoutBabyInput = {
    where: FeedingEventWhereUniqueInput
    create: XOR<FeedingEventCreateWithoutBabyInput, FeedingEventUncheckedCreateWithoutBabyInput>
  }

  export type FeedingEventCreateManyBabyInputEnvelope = {
    data: FeedingEventCreateManyBabyInput | FeedingEventCreateManyBabyInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationCreateWithoutBabyInput = {
    id?: string
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recordedBy?: UserCreateNestedOneWithoutConsultationsRecordedInput
  }

  export type ConsultationUncheckedCreateWithoutBabyInput = {
    id?: string
    recordedById?: string | null
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationCreateOrConnectWithoutBabyInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutBabyInput, ConsultationUncheckedCreateWithoutBabyInput>
  }

  export type ConsultationCreateManyBabyInputEnvelope = {
    data: ConsultationCreateManyBabyInput | ConsultationCreateManyBabyInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutBabyInput = {
    id?: string
    title: string
    startsAt: Date | string
    endsAt?: Date | string | null
    location?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUncheckedCreateWithoutBabyInput = {
    id?: string
    title: string
    startsAt: Date | string
    endsAt?: Date | string | null
    location?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutBabyInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutBabyInput, AppointmentUncheckedCreateWithoutBabyInput>
  }

  export type AppointmentCreateManyBabyInputEnvelope = {
    data: AppointmentCreateManyBabyInput | AppointmentCreateManyBabyInput[]
    skipDuplicates?: boolean
  }

  export type PredictionCacheCreateWithoutBabyInput = {
    id?: string
    kind: string
    inputFingerprint: string
    payload: JsonNullValueInput | InputJsonValue
    modelVersion?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PredictionCacheUncheckedCreateWithoutBabyInput = {
    id?: string
    kind: string
    inputFingerprint: string
    payload: JsonNullValueInput | InputJsonValue
    modelVersion?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PredictionCacheCreateOrConnectWithoutBabyInput = {
    where: PredictionCacheWhereUniqueInput
    create: XOR<PredictionCacheCreateWithoutBabyInput, PredictionCacheUncheckedCreateWithoutBabyInput>
  }

  export type PredictionCacheCreateManyBabyInputEnvelope = {
    data: PredictionCacheCreateManyBabyInput | PredictionCacheCreateManyBabyInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdUpsertWithoutBabiesInput = {
    update: XOR<HouseholdUpdateWithoutBabiesInput, HouseholdUncheckedUpdateWithoutBabiesInput>
    create: XOR<HouseholdCreateWithoutBabiesInput, HouseholdUncheckedCreateWithoutBabiesInput>
    where?: HouseholdWhereInput
  }

  export type HouseholdUpdateToOneWithWhereWithoutBabiesInput = {
    where?: HouseholdWhereInput
    data: XOR<HouseholdUpdateWithoutBabiesInput, HouseholdUncheckedUpdateWithoutBabiesInput>
  }

  export type HouseholdUpdateWithoutBabiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMembershipUpdateManyWithoutHouseholdNestedInput
    invites?: CaregiverInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutBabiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMembershipUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: CaregiverInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type FeedingEventUpsertWithWhereUniqueWithoutBabyInput = {
    where: FeedingEventWhereUniqueInput
    update: XOR<FeedingEventUpdateWithoutBabyInput, FeedingEventUncheckedUpdateWithoutBabyInput>
    create: XOR<FeedingEventCreateWithoutBabyInput, FeedingEventUncheckedCreateWithoutBabyInput>
  }

  export type FeedingEventUpdateWithWhereUniqueWithoutBabyInput = {
    where: FeedingEventWhereUniqueInput
    data: XOR<FeedingEventUpdateWithoutBabyInput, FeedingEventUncheckedUpdateWithoutBabyInput>
  }

  export type FeedingEventUpdateManyWithWhereWithoutBabyInput = {
    where: FeedingEventScalarWhereInput
    data: XOR<FeedingEventUpdateManyMutationInput, FeedingEventUncheckedUpdateManyWithoutBabyInput>
  }

  export type FeedingEventScalarWhereInput = {
    AND?: FeedingEventScalarWhereInput | FeedingEventScalarWhereInput[]
    OR?: FeedingEventScalarWhereInput[]
    NOT?: FeedingEventScalarWhereInput | FeedingEventScalarWhereInput[]
    id?: StringFilter<"FeedingEvent"> | string
    babyId?: StringFilter<"FeedingEvent"> | string
    loggedByUserId?: StringFilter<"FeedingEvent"> | string
    startedAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    endedAt?: DateTimeNullableFilter<"FeedingEvent"> | Date | string | null
    amountMl?: IntFilter<"FeedingEvent"> | number
    milkType?: EnumMilkTypeFilter<"FeedingEvent"> | $Enums.MilkType
    notes?: StringNullableFilter<"FeedingEvent"> | string | null
    createdAt?: DateTimeFilter<"FeedingEvent"> | Date | string
    updatedAt?: DateTimeFilter<"FeedingEvent"> | Date | string
  }

  export type ConsultationUpsertWithWhereUniqueWithoutBabyInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutBabyInput, ConsultationUncheckedUpdateWithoutBabyInput>
    create: XOR<ConsultationCreateWithoutBabyInput, ConsultationUncheckedCreateWithoutBabyInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutBabyInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutBabyInput, ConsultationUncheckedUpdateWithoutBabyInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutBabyInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutBabyInput>
  }

  export type ConsultationScalarWhereInput = {
    AND?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    OR?: ConsultationScalarWhereInput[]
    NOT?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    id?: StringFilter<"Consultation"> | string
    babyId?: StringFilter<"Consultation"> | string
    recordedById?: StringNullableFilter<"Consultation"> | string | null
    occurredAt?: DateTimeFilter<"Consultation"> | Date | string
    location?: StringFilter<"Consultation"> | string
    reason?: StringFilter<"Consultation"> | string
    outcomeNotes?: StringNullableFilter<"Consultation"> | string | null
    providerName?: StringNullableFilter<"Consultation"> | string | null
    followUpAt?: DateTimeNullableFilter<"Consultation"> | Date | string | null
    createdAt?: DateTimeFilter<"Consultation"> | Date | string
    updatedAt?: DateTimeFilter<"Consultation"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutBabyInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutBabyInput, AppointmentUncheckedUpdateWithoutBabyInput>
    create: XOR<AppointmentCreateWithoutBabyInput, AppointmentUncheckedCreateWithoutBabyInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutBabyInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutBabyInput, AppointmentUncheckedUpdateWithoutBabyInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutBabyInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutBabyInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    babyId?: StringFilter<"Appointment"> | string
    title?: StringFilter<"Appointment"> | string
    startsAt?: DateTimeFilter<"Appointment"> | Date | string
    endsAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    location?: StringNullableFilter<"Appointment"> | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type PredictionCacheUpsertWithWhereUniqueWithoutBabyInput = {
    where: PredictionCacheWhereUniqueInput
    update: XOR<PredictionCacheUpdateWithoutBabyInput, PredictionCacheUncheckedUpdateWithoutBabyInput>
    create: XOR<PredictionCacheCreateWithoutBabyInput, PredictionCacheUncheckedCreateWithoutBabyInput>
  }

  export type PredictionCacheUpdateWithWhereUniqueWithoutBabyInput = {
    where: PredictionCacheWhereUniqueInput
    data: XOR<PredictionCacheUpdateWithoutBabyInput, PredictionCacheUncheckedUpdateWithoutBabyInput>
  }

  export type PredictionCacheUpdateManyWithWhereWithoutBabyInput = {
    where: PredictionCacheScalarWhereInput
    data: XOR<PredictionCacheUpdateManyMutationInput, PredictionCacheUncheckedUpdateManyWithoutBabyInput>
  }

  export type PredictionCacheScalarWhereInput = {
    AND?: PredictionCacheScalarWhereInput | PredictionCacheScalarWhereInput[]
    OR?: PredictionCacheScalarWhereInput[]
    NOT?: PredictionCacheScalarWhereInput | PredictionCacheScalarWhereInput[]
    id?: StringFilter<"PredictionCache"> | string
    babyId?: StringFilter<"PredictionCache"> | string
    kind?: StringFilter<"PredictionCache"> | string
    inputFingerprint?: StringFilter<"PredictionCache"> | string
    payload?: JsonFilter<"PredictionCache">
    modelVersion?: StringNullableFilter<"PredictionCache"> | string | null
    expiresAt?: DateTimeFilter<"PredictionCache"> | Date | string
    createdAt?: DateTimeFilter<"PredictionCache"> | Date | string
  }

  export type BabyCreateWithoutFeedingEventsInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutBabiesInput
    consultations?: ConsultationCreateNestedManyWithoutBabyInput
    appointments?: AppointmentCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutFeedingEventsInput = {
    id?: string
    householdId: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    consultations?: ConsultationUncheckedCreateNestedManyWithoutBabyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutFeedingEventsInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutFeedingEventsInput, BabyUncheckedCreateWithoutFeedingEventsInput>
  }

  export type UserCreateWithoutFeedingEventsLoggedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteCreateNestedManyWithoutAcceptedByInput
    consultationsRecorded?: ConsultationCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateWithoutFeedingEventsLoggedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    consultationsRecorded?: ConsultationUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserCreateOrConnectWithoutFeedingEventsLoggedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedingEventsLoggedInput, UserUncheckedCreateWithoutFeedingEventsLoggedInput>
  }

  export type BabyUpsertWithoutFeedingEventsInput = {
    update: XOR<BabyUpdateWithoutFeedingEventsInput, BabyUncheckedUpdateWithoutFeedingEventsInput>
    create: XOR<BabyCreateWithoutFeedingEventsInput, BabyUncheckedCreateWithoutFeedingEventsInput>
    where?: BabyWhereInput
  }

  export type BabyUpdateToOneWithWhereWithoutFeedingEventsInput = {
    where?: BabyWhereInput
    data: XOR<BabyUpdateWithoutFeedingEventsInput, BabyUncheckedUpdateWithoutFeedingEventsInput>
  }

  export type BabyUpdateWithoutFeedingEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutBabiesNestedInput
    consultations?: ConsultationUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutFeedingEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultations?: ConsultationUncheckedUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type UserUpsertWithoutFeedingEventsLoggedInput = {
    update: XOR<UserUpdateWithoutFeedingEventsLoggedInput, UserUncheckedUpdateWithoutFeedingEventsLoggedInput>
    create: XOR<UserCreateWithoutFeedingEventsLoggedInput, UserUncheckedCreateWithoutFeedingEventsLoggedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedingEventsLoggedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedingEventsLoggedInput, UserUncheckedUpdateWithoutFeedingEventsLoggedInput>
  }

  export type UserUpdateWithoutFeedingEventsLoggedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUpdateManyWithoutAcceptedByNestedInput
    consultationsRecorded?: ConsultationUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedingEventsLoggedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    consultationsRecorded?: ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type BabyCreateWithoutConsultationsInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutBabiesInput
    feedingEvents?: FeedingEventCreateNestedManyWithoutBabyInput
    appointments?: AppointmentCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutConsultationsInput = {
    id?: string
    householdId: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedingEvents?: FeedingEventUncheckedCreateNestedManyWithoutBabyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutConsultationsInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutConsultationsInput, BabyUncheckedCreateWithoutConsultationsInput>
  }

  export type UserCreateWithoutConsultationsRecordedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventCreateNestedManyWithoutLoggedByInput
  }

  export type UserUncheckedCreateWithoutConsultationsRecordedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput
  }

  export type UserCreateOrConnectWithoutConsultationsRecordedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConsultationsRecordedInput, UserUncheckedCreateWithoutConsultationsRecordedInput>
  }

  export type BabyUpsertWithoutConsultationsInput = {
    update: XOR<BabyUpdateWithoutConsultationsInput, BabyUncheckedUpdateWithoutConsultationsInput>
    create: XOR<BabyCreateWithoutConsultationsInput, BabyUncheckedCreateWithoutConsultationsInput>
    where?: BabyWhereInput
  }

  export type BabyUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: BabyWhereInput
    data: XOR<BabyUpdateWithoutConsultationsInput, BabyUncheckedUpdateWithoutConsultationsInput>
  }

  export type BabyUpdateWithoutConsultationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutBabiesNestedInput
    feedingEvents?: FeedingEventUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutConsultationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedingEvents?: FeedingEventUncheckedUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type UserUpsertWithoutConsultationsRecordedInput = {
    update: XOR<UserUpdateWithoutConsultationsRecordedInput, UserUncheckedUpdateWithoutConsultationsRecordedInput>
    create: XOR<UserCreateWithoutConsultationsRecordedInput, UserUncheckedCreateWithoutConsultationsRecordedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConsultationsRecordedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConsultationsRecordedInput, UserUncheckedUpdateWithoutConsultationsRecordedInput>
  }

  export type UserUpdateWithoutConsultationsRecordedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUpdateManyWithoutLoggedByNestedInput
  }

  export type UserUncheckedUpdateWithoutConsultationsRecordedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput
  }

  export type BabyCreateWithoutAppointmentsInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutBabiesInput
    feedingEvents?: FeedingEventCreateNestedManyWithoutBabyInput
    consultations?: ConsultationCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    householdId: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedingEvents?: FeedingEventUncheckedCreateNestedManyWithoutBabyInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutBabyInput
    predictionCaches?: PredictionCacheUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutAppointmentsInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutAppointmentsInput, BabyUncheckedCreateWithoutAppointmentsInput>
  }

  export type BabyUpsertWithoutAppointmentsInput = {
    update: XOR<BabyUpdateWithoutAppointmentsInput, BabyUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<BabyCreateWithoutAppointmentsInput, BabyUncheckedCreateWithoutAppointmentsInput>
    where?: BabyWhereInput
  }

  export type BabyUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: BabyWhereInput
    data: XOR<BabyUpdateWithoutAppointmentsInput, BabyUncheckedUpdateWithoutAppointmentsInput>
  }

  export type BabyUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutBabiesNestedInput
    feedingEvents?: FeedingEventUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedingEvents?: FeedingEventUncheckedUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type BabyCreateWithoutPredictionCachesInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutBabiesInput
    feedingEvents?: FeedingEventCreateNestedManyWithoutBabyInput
    consultations?: ConsultationCreateNestedManyWithoutBabyInput
    appointments?: AppointmentCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutPredictionCachesInput = {
    id?: string
    householdId: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedingEvents?: FeedingEventUncheckedCreateNestedManyWithoutBabyInput
    consultations?: ConsultationUncheckedCreateNestedManyWithoutBabyInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutPredictionCachesInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutPredictionCachesInput, BabyUncheckedCreateWithoutPredictionCachesInput>
  }

  export type BabyUpsertWithoutPredictionCachesInput = {
    update: XOR<BabyUpdateWithoutPredictionCachesInput, BabyUncheckedUpdateWithoutPredictionCachesInput>
    create: XOR<BabyCreateWithoutPredictionCachesInput, BabyUncheckedCreateWithoutPredictionCachesInput>
    where?: BabyWhereInput
  }

  export type BabyUpdateToOneWithWhereWithoutPredictionCachesInput = {
    where?: BabyWhereInput
    data: XOR<BabyUpdateWithoutPredictionCachesInput, BabyUncheckedUpdateWithoutPredictionCachesInput>
  }

  export type BabyUpdateWithoutPredictionCachesInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutBabiesNestedInput
    feedingEvents?: FeedingEventUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutPredictionCachesInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedingEvents?: FeedingEventUncheckedUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    sessions?: SessionCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    isActive?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    householdMemberships?: HouseholdMembershipUncheckedCreateNestedManyWithoutUserInput
    invitesSent?: CaregiverInviteUncheckedCreateNestedManyWithoutInvitedByInput
    invitesAccepted?: CaregiverInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    feedingEventsLogged?: FeedingEventUncheckedCreateNestedManyWithoutLoggedByInput
    consultationsRecorded?: ConsultationUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    householdMemberships?: HouseholdMembershipUncheckedUpdateManyWithoutUserNestedInput
    invitesSent?: CaregiverInviteUncheckedUpdateManyWithoutInvitedByNestedInput
    invitesAccepted?: CaregiverInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    feedingEventsLogged?: FeedingEventUncheckedUpdateManyWithoutLoggedByNestedInput
    consultationsRecorded?: ConsultationUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdMembershipCreateWithoutUserInput = {
    id?: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutMembershipsInput
  }

  export type HouseholdMembershipUncheckedCreateWithoutUserInput = {
    id?: string
    householdId: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HouseholdMembershipCreateOrConnectWithoutUserInput = {
    where: HouseholdMembershipWhereUniqueInput
    create: XOR<HouseholdMembershipCreateWithoutUserInput, HouseholdMembershipUncheckedCreateWithoutUserInput>
  }

  export type HouseholdMembershipCreateManyUserInputEnvelope = {
    data: HouseholdMembershipCreateManyUserInput | HouseholdMembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CaregiverInviteCreateWithoutInvitedByInput = {
    id?: string
    emailNormalized: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    household: HouseholdCreateNestedOneWithoutInvitesInput
    acceptedBy?: UserCreateNestedOneWithoutInvitesAcceptedInput
  }

  export type CaregiverInviteUncheckedCreateWithoutInvitedByInput = {
    id?: string
    householdId: string
    emailNormalized: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    acceptedByUserId?: string | null
  }

  export type CaregiverInviteCreateOrConnectWithoutInvitedByInput = {
    where: CaregiverInviteWhereUniqueInput
    create: XOR<CaregiverInviteCreateWithoutInvitedByInput, CaregiverInviteUncheckedCreateWithoutInvitedByInput>
  }

  export type CaregiverInviteCreateManyInvitedByInputEnvelope = {
    data: CaregiverInviteCreateManyInvitedByInput | CaregiverInviteCreateManyInvitedByInput[]
    skipDuplicates?: boolean
  }

  export type CaregiverInviteCreateWithoutAcceptedByInput = {
    id?: string
    emailNormalized: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    household: HouseholdCreateNestedOneWithoutInvitesInput
    invitedBy: UserCreateNestedOneWithoutInvitesSentInput
  }

  export type CaregiverInviteUncheckedCreateWithoutAcceptedByInput = {
    id?: string
    householdId: string
    emailNormalized: string
    token: string
    invitedByUserId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
  }

  export type CaregiverInviteCreateOrConnectWithoutAcceptedByInput = {
    where: CaregiverInviteWhereUniqueInput
    create: XOR<CaregiverInviteCreateWithoutAcceptedByInput, CaregiverInviteUncheckedCreateWithoutAcceptedByInput>
  }

  export type CaregiverInviteCreateManyAcceptedByInputEnvelope = {
    data: CaregiverInviteCreateManyAcceptedByInput | CaregiverInviteCreateManyAcceptedByInput[]
    skipDuplicates?: boolean
  }

  export type FeedingEventCreateWithoutLoggedByInput = {
    id?: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutFeedingEventsInput
  }

  export type FeedingEventUncheckedCreateWithoutLoggedByInput = {
    id?: string
    babyId: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedingEventCreateOrConnectWithoutLoggedByInput = {
    where: FeedingEventWhereUniqueInput
    create: XOR<FeedingEventCreateWithoutLoggedByInput, FeedingEventUncheckedCreateWithoutLoggedByInput>
  }

  export type FeedingEventCreateManyLoggedByInputEnvelope = {
    data: FeedingEventCreateManyLoggedByInput | FeedingEventCreateManyLoggedByInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationCreateWithoutRecordedByInput = {
    id?: string
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutConsultationsInput
  }

  export type ConsultationUncheckedCreateWithoutRecordedByInput = {
    id?: string
    babyId: string
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationCreateOrConnectWithoutRecordedByInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutRecordedByInput, ConsultationUncheckedCreateWithoutRecordedByInput>
  }

  export type ConsultationCreateManyRecordedByInputEnvelope = {
    data: ConsultationCreateManyRecordedByInput | ConsultationCreateManyRecordedByInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type HouseholdMembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: HouseholdMembershipWhereUniqueInput
    update: XOR<HouseholdMembershipUpdateWithoutUserInput, HouseholdMembershipUncheckedUpdateWithoutUserInput>
    create: XOR<HouseholdMembershipCreateWithoutUserInput, HouseholdMembershipUncheckedCreateWithoutUserInput>
  }

  export type HouseholdMembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: HouseholdMembershipWhereUniqueInput
    data: XOR<HouseholdMembershipUpdateWithoutUserInput, HouseholdMembershipUncheckedUpdateWithoutUserInput>
  }

  export type HouseholdMembershipUpdateManyWithWhereWithoutUserInput = {
    where: HouseholdMembershipScalarWhereInput
    data: XOR<HouseholdMembershipUpdateManyMutationInput, HouseholdMembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type CaregiverInviteUpsertWithWhereUniqueWithoutInvitedByInput = {
    where: CaregiverInviteWhereUniqueInput
    update: XOR<CaregiverInviteUpdateWithoutInvitedByInput, CaregiverInviteUncheckedUpdateWithoutInvitedByInput>
    create: XOR<CaregiverInviteCreateWithoutInvitedByInput, CaregiverInviteUncheckedCreateWithoutInvitedByInput>
  }

  export type CaregiverInviteUpdateWithWhereUniqueWithoutInvitedByInput = {
    where: CaregiverInviteWhereUniqueInput
    data: XOR<CaregiverInviteUpdateWithoutInvitedByInput, CaregiverInviteUncheckedUpdateWithoutInvitedByInput>
  }

  export type CaregiverInviteUpdateManyWithWhereWithoutInvitedByInput = {
    where: CaregiverInviteScalarWhereInput
    data: XOR<CaregiverInviteUpdateManyMutationInput, CaregiverInviteUncheckedUpdateManyWithoutInvitedByInput>
  }

  export type CaregiverInviteUpsertWithWhereUniqueWithoutAcceptedByInput = {
    where: CaregiverInviteWhereUniqueInput
    update: XOR<CaregiverInviteUpdateWithoutAcceptedByInput, CaregiverInviteUncheckedUpdateWithoutAcceptedByInput>
    create: XOR<CaregiverInviteCreateWithoutAcceptedByInput, CaregiverInviteUncheckedCreateWithoutAcceptedByInput>
  }

  export type CaregiverInviteUpdateWithWhereUniqueWithoutAcceptedByInput = {
    where: CaregiverInviteWhereUniqueInput
    data: XOR<CaregiverInviteUpdateWithoutAcceptedByInput, CaregiverInviteUncheckedUpdateWithoutAcceptedByInput>
  }

  export type CaregiverInviteUpdateManyWithWhereWithoutAcceptedByInput = {
    where: CaregiverInviteScalarWhereInput
    data: XOR<CaregiverInviteUpdateManyMutationInput, CaregiverInviteUncheckedUpdateManyWithoutAcceptedByInput>
  }

  export type FeedingEventUpsertWithWhereUniqueWithoutLoggedByInput = {
    where: FeedingEventWhereUniqueInput
    update: XOR<FeedingEventUpdateWithoutLoggedByInput, FeedingEventUncheckedUpdateWithoutLoggedByInput>
    create: XOR<FeedingEventCreateWithoutLoggedByInput, FeedingEventUncheckedCreateWithoutLoggedByInput>
  }

  export type FeedingEventUpdateWithWhereUniqueWithoutLoggedByInput = {
    where: FeedingEventWhereUniqueInput
    data: XOR<FeedingEventUpdateWithoutLoggedByInput, FeedingEventUncheckedUpdateWithoutLoggedByInput>
  }

  export type FeedingEventUpdateManyWithWhereWithoutLoggedByInput = {
    where: FeedingEventScalarWhereInput
    data: XOR<FeedingEventUpdateManyMutationInput, FeedingEventUncheckedUpdateManyWithoutLoggedByInput>
  }

  export type ConsultationUpsertWithWhereUniqueWithoutRecordedByInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutRecordedByInput, ConsultationUncheckedUpdateWithoutRecordedByInput>
    create: XOR<ConsultationCreateWithoutRecordedByInput, ConsultationUncheckedCreateWithoutRecordedByInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutRecordedByInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutRecordedByInput, ConsultationUncheckedUpdateWithoutRecordedByInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutRecordedByInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutRecordedByInput>
  }

  export type HouseholdMembershipCreateManyHouseholdInput = {
    id?: string
    userId: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BabyCreateManyHouseholdInput = {
    id?: string
    displayName: string
    birthDateTime: Date | string
    birthWeightGrams?: number | null
    birthLengthCm?: number | null
    headCircumferenceCm?: number | null
    sex?: $Enums.BabySex
    notes?: string | null
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaregiverInviteCreateManyHouseholdInput = {
    id?: string
    emailNormalized: string
    token: string
    invitedByUserId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    acceptedByUserId?: string | null
  }

  export type HouseholdMembershipUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHouseholdMembershipsNestedInput
  }

  export type HouseholdMembershipUncheckedUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMembershipUncheckedUpdateManyWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BabyUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedingEvents?: FeedingEventUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedingEvents?: FeedingEventUncheckedUpdateManyWithoutBabyNestedInput
    consultations?: ConsultationUncheckedUpdateManyWithoutBabyNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutBabyNestedInput
    predictionCaches?: PredictionCacheUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateManyWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    birthDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    birthWeightGrams?: NullableIntFieldUpdateOperationsInput | number | null
    birthLengthCm?: NullableIntFieldUpdateOperationsInput | number | null
    headCircumferenceCm?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: EnumBabySexFieldUpdateOperationsInput | $Enums.BabySex
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaregiverInviteUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedBy?: UserUpdateOneRequiredWithoutInvitesSentNestedInput
    acceptedBy?: UserUpdateOneWithoutInvitesAcceptedNestedInput
  }

  export type CaregiverInviteUncheckedUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    invitedByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CaregiverInviteUncheckedUpdateManyWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    invitedByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeedingEventCreateManyBabyInput = {
    id?: string
    loggedByUserId: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationCreateManyBabyInput = {
    id?: string
    recordedById?: string | null
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyBabyInput = {
    id?: string
    title: string
    startsAt: Date | string
    endsAt?: Date | string | null
    location?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PredictionCacheCreateManyBabyInput = {
    id?: string
    kind: string
    inputFingerprint: string
    payload: JsonNullValueInput | InputJsonValue
    modelVersion?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type FeedingEventUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loggedBy?: UserUpdateOneRequiredWithoutFeedingEventsLoggedNestedInput
  }

  export type FeedingEventUncheckedUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loggedByUserId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedingEventUncheckedUpdateManyWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loggedByUserId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordedBy?: UserUpdateOneWithoutConsultationsRecordedNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionCacheUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    inputFingerprint?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    modelVersion?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionCacheUncheckedUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    inputFingerprint?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    modelVersion?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionCacheUncheckedUpdateManyWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    inputFingerprint?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    modelVersion?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type HouseholdMembershipCreateManyUserInput = {
    id?: string
    householdId: string
    role: $Enums.HouseholdRole
    displayLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaregiverInviteCreateManyInvitedByInput = {
    id?: string
    householdId: string
    emailNormalized: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
    acceptedByUserId?: string | null
  }

  export type CaregiverInviteCreateManyAcceptedByInput = {
    id?: string
    householdId: string
    emailNormalized: string
    token: string
    invitedByUserId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    acceptedAt?: Date | string | null
  }

  export type FeedingEventCreateManyLoggedByInput = {
    id?: string
    babyId: string
    startedAt: Date | string
    endedAt?: Date | string | null
    amountMl: number
    milkType?: $Enums.MilkType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationCreateManyRecordedByInput = {
    id?: string
    babyId: string
    occurredAt: Date | string
    location: string
    reason: string
    outcomeNotes?: string | null
    providerName?: string | null
    followUpAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMembershipUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type HouseholdMembershipUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMembershipUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    displayLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaregiverInviteUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    household?: HouseholdUpdateOneRequiredWithoutInvitesNestedInput
    acceptedBy?: UserUpdateOneWithoutInvitesAcceptedNestedInput
  }

  export type CaregiverInviteUncheckedUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CaregiverInviteUncheckedUpdateManyWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CaregiverInviteUpdateWithoutAcceptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    household?: HouseholdUpdateOneRequiredWithoutInvitesNestedInput
    invitedBy?: UserUpdateOneRequiredWithoutInvitesSentNestedInput
  }

  export type CaregiverInviteUncheckedUpdateWithoutAcceptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    invitedByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaregiverInviteUncheckedUpdateManyWithoutAcceptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    invitedByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedingEventUpdateWithoutLoggedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutFeedingEventsNestedInput
  }

  export type FeedingEventUncheckedUpdateWithoutLoggedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedingEventUncheckedUpdateManyWithoutLoggedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountMl?: IntFieldUpdateOperationsInput | number
    milkType?: EnumMilkTypeFieldUpdateOperationsInput | $Enums.MilkType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUpdateWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutConsultationsNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    outcomeNotes?: NullableStringFieldUpdateOperationsInput | string | null
    providerName?: NullableStringFieldUpdateOperationsInput | string | null
    followUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}