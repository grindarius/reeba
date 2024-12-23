import {
  type ColumnBaseConfig,
  type ColumnBuilderBaseConfig,
  type ColumnBuilderRuntimeConfig,
  type MakeColumnConfig,
  entityKind
} from "drizzle-orm"
import { type AnyPgTable, PgColumn, PgColumnBuilder } from "drizzle-orm/pg-core"

export type PgByteaBuilderInitial<TName extends string> = PgByteaBuilder<{
  name: TName
  dataType: "buffer"
  columnType: "PgBytea"
  data: Buffer
  driverParam: Buffer
  enumValues: undefined
  generated: undefined
}>

export class PgByteaBuilder<
  T extends ColumnBuilderBaseConfig<"buffer", "PgBytea">
> extends PgColumnBuilder<T> {
  static readonly [entityKind]: string = "PgByteaBuilder"

  constructor(name: T["name"]) {
    super(name, "buffer", "PgBytea")
  }

  /** @internal */
  build<TTableName extends string>(
    table: AnyPgTable<{ name: TTableName }>
  ): PgBytea<MakeColumnConfig<T, TTableName>> {
    return new PgBytea<MakeColumnConfig<T, TTableName>>(
      table,
      // biome-ignore lint/suspicious/noExplicitAny: The docs does it like this.
      this.config as ColumnBuilderRuntimeConfig<any, any>
    )
  }
}

export class PgBytea<
  T extends ColumnBaseConfig<"buffer", "PgBytea">
> extends PgColumn<T> {
  static readonly [entityKind]: string = "PgBytea"

  getSQLType() {
    return "bytea"
  }

  override mapFromDriverValue(value: string | Buffer): Buffer {
    if (typeof value === "string") {
      // Slice out the `\x` in front.
      return Buffer.from(value.slice(2), "hex")
    }

    return value
  }

  override mapToDriverValue(value: Buffer): string {
    return `\\x${value.toString("hex")}`
  }
}

export function bytea<TName extends string>(
  name: TName
): PgByteaBuilderInitial<TName> {
  return new PgByteaBuilder(name)
}
