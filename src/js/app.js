var App = {
    web3Provider: null,
    contracts: {}
}

$(window).load(function () {
    if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
    } else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(App.web3Provider);
    }
    $.getJSON("Election.json", function (election) {
        App.contracts.Election = TruffleContract(election);
        App.contracts.Election.setProvider(App.web3Provider);

        render();
    });

    function render() {

        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("내 계정 정보: " + account);
            }
        });

        App.contracts.Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.candidatesCount();
        }).then(function (candidatesCount) {
            for (var i = 1; i <= candidatesCount; i++) {
                electionInstance.candidates(i).then(function (candidate) {
                    var id = candidate[0];
                    var name = candidate[1];
                    var voteCount = candidate[2];

                    // 투표결과 표
                    var candidateTemplate = "<tr><th>" + id + "번" + "</th><td>" + name + "</td><td>" + voteCount + "표" + "</td></tr>"
                    $("#candidatesResults").append(candidateTemplate);

                    // 투표 페이지 후보자 목록
                    var candidateOption = '<option value="' + id + '">' + name + '</option>'
                    $('#candidateSelect').append(candidateOption);
                });
            }

            // 후보자 화면 표시
            $("#loader").hide();
            $("#content").show();
        }).catch(function (error) {
            console.warn(error);
        });
    }

    $('#btnVote').on('click', function() {
        var candidateId = $('#candidateSelect').val()
        if (!candidateId) {
            return alert('후보자를 선택하세요.')
        }
        App.contracts.Election.deployed()
            .then(function(instance) {
                return instance.vote(candidateId, {from: App.account})
            })
            .then(function(result) {
                if (result.receipt) {
                    alert('투표가 완료되었습니다. 감사합니다!')
                    location.reload();
                }
            })
            .catch(function(error) {
                alert(error.message)
            })
    })
    const remainTime = document.querySelector("#remain-time");

    function diffDay() {
        const masTime = new Date("2022-06-14");
        const todayTime = new Date();

        const diff = masTime - todayTime;

        const diffDay = Math.floor(diff / (1000*60*60*24));
        const diffHour = Math.floor((diff / (1000*60*60)) % 24);
        const diffMin = Math.floor((diff / (1000*60)) % 60);
        const diffSec = Math.floor(diff / 1000 % 60);

        remainTime.innerText = `${diffDay}일 ${diffHour}시간 ${diffMin}분 ${diffSec}초`;
    }
    diffDay();
    setInterval(diffDay, 1000);
});