

export default function Home() {
  return (
    <div className="container">
      <div className="page-header">
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '100%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}>GeeksforGeeks</h1>
      </div>
    </div>
  );
}
