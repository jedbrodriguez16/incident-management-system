export type ItemHandler = (item: any) => Promise<any>;

export default interface IFlowService {
  each<TData>(
    items: TData[],
    handler: ItemHandler,
    parallelCount?: number
  ): Promise<any>;
}
