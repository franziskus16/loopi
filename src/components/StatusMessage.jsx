/** Loading, empty and error states, announced to screen readers. */
const StatusMessage = ({ kind = "loading", title, children }) => (
  <div
    role={kind === "error" ? "alert" : "status"}
    className={`my-10 flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center ${
      kind === "error" ? "border-red-300" : "border-gray-300"
    }`}
  >
    {kind === "loading" && (
      <span
        className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"
        aria-hidden="true"
      />
    )}
    <p className="text-lg font-medium text-gray-900">{title}</p>
    {children}
  </div>
);

export default StatusMessage;
