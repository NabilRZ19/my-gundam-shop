export default function MyComments({ comments = [] }) {
    if (comments.length === 0) {
        return (
            <div className="p-6 text-center border border-dashed border-[var(--light-border)] bg-[var(--white)]">
                <p className="text-[var(--mid)] font-mono text-sm">No transmissions logged yet.</p>
            </div>
        );
    }

    return (
        <div className="comments-section space-y-4">
            <h3 className="section-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Communication Logs</h3>
            
            {comments.map(comment => (
                <div key={comment.id} className="comment-card p-4 border border-[var(--light-border)] bg-[var(--white)]">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-[var(--mid)] uppercase tracking-wider">
                            On: {comment.review?.Title || 'Unknown Log'}
                        </span>
                        <span className="text-xs text-[var(--mid)] font-mono">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-sm text-[var(--dark)] leading-relaxed italic">
                        "{comment.comment_text}"
                    </p>
                </div>
            ))}
        </div>
    );
}
