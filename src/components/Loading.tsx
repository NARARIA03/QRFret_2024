interface Props {
  isLoading: boolean;
}

export default function Loading({ isLoading }: Props) {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
