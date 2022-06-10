pragma solidity ^0.5.0;

contract Election {
    
    // 후보자 모델
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // 후보자 기호 변수
    uint public candidatesCount;

    // 후보자 반환
    mapping(uint => Candidate) public candidates;

    // 투표에 참여한 ID 기록
    mapping(address => bool) public voters;

    // 후보자 등록
    function addCandidate (string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // constructor
    constructor() public {
        addCandidate('한규리');
        addCandidate('최여은');
        addCandidate('후보1');
        addCandidate('후보2');
    }

    // 투표하기
    function vote(uint _candidateId) public {
        
        // 중복투표를 하면 오류 발생
        require(!voters[msg.sender]);

        // 목록에 없는 후보자에게 투표하면 오류 발생
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // 투표에 참여한 ID를 기록해서 두번 투표하지 못하도록 함
        voters[msg.sender] = true;

        // 득표수 +1
        candidates[_candidateId].voteCount ++;
    }
}