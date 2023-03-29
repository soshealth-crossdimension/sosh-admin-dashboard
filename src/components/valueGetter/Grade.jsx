export default function Grade ({grade}) {
    var gradeType;
    if (grade === 1) 
        gradeType = 'First';
    else if (grade === 2)
        gradeType = 'Second';
    else if (grade === 3)
        gradeType = 'Third';
    else
        gradeType = 'N/A';
    return (
        `${gradeType}`
    );
}